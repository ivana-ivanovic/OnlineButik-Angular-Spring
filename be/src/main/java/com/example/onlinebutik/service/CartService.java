package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Cart;
import com.example.onlinebutik.model.CartItemModel;
import com.example.onlinebutik.model.CartModel;
import com.example.onlinebutik.model.ItemsModel;
import com.example.onlinebutik.repository.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class CartService implements ICartService{

    @Autowired
    ICartRepository cartRepository;
    @Autowired
    ItemService itemService;
    @Autowired
    private AutoMapperService autoMapperService;

    @Override
    public CartModel addToCart(String cartId, String itemId, String size) {

            Cart cart = cartRepository.findById(cartId).get();
            AtomicBoolean a = new AtomicBoolean(false);
            cart.getItems().forEach(item -> {
                if(item.getItemId().equals(itemId) && item.getSize().equals(size) && item.getAmount() > 0) {
                    ItemsModel i = itemService.findById(itemId);
                    item.setAmount(item.getAmount()+1);
                    item.setForPayment(item.getAmount()*i.getPrice());
                    item.setSize(size);
                    a.set(true);
                }
            });
            if(!a.get()){
                ItemsModel itemsModel = itemService.findById(itemId);
                CartItemModel ci = new CartItemModel(itemId, 1 , itemsModel.getPrice(), size );
                cart.getItems().add(ci);
            }
            cart.setTotalPrice(forPayment(autoMapperService.map(cart, CartModel.class)));
            cart.setLastModified(LocalDate.now());

            return autoMapperService.map(cartRepository.save(cart), CartModel.class);


    }

    @Override
    public CartModel removeFromCart(String cartId,  String itemId, String size) {

        Cart cart = cartRepository.findById(cartId).get();
        List<CartItemModel> i = new ArrayList<CartItemModel>();
        cart.getItems().forEach(item -> {
            if(!(item.getItemId().equals(itemId) && item.getSize().equals(size))) {
                i.add(item);
            }
        });
        if(i.size() != 0){
            cart.setLastModified(LocalDate.now());
            cart.setItems(i);
            cart.setTotalPrice(forPayment(autoMapperService.map(cart, CartModel.class)));
            return autoMapperService.map(cartRepository.save(cart), CartModel.class);
        }
        cart.setItems(i);
        return emptyCart(autoMapperService.map(cart, CartModel.class));
    }

    @Override
    public Double forPayment(CartModel cart) {
        AtomicReference<Double> forPayment = new AtomicReference<>(0.0);
        cart.getItems().forEach(item -> {
            forPayment.updateAndGet(v -> v + item.getForPayment());});
        return forPayment.get();
    }

    @Override
    public CartModel createCart( String itemId, String size) {
        ItemsModel itemsModel = itemService.findById(itemId);
        CartItemModel ci = new CartItemModel(itemId, 1 , itemsModel.getPrice(), size );
        ArrayList<CartItemModel> items = new ArrayList<CartItemModel>();
        items.add(ci);
        CartModel cart = new CartModel();
        cart.setStatus("pending");
        cart.setLastModified(LocalDate.now());
        cart.setItems(items);
        cart.setTotalPrice(forPayment(cart));
        return autoMapperService.map(cartRepository.save(autoMapperService.map(cart, Cart.class)), CartModel.class);
    }

    @Override
    public CartModel emptyCart(CartModel cart) {
        cart.setStatus("deleted");
        cartRepository.save(autoMapperService.map(cart, Cart.class));
        return cart;
    }

    @Override
    public CartModel updateOrderedCart(CartModel cart) {
        cart.setStatus("ordered");
        cartRepository.save(autoMapperService.map(cart, Cart.class));
        return cart;
    }

    @Override
    public CartModel findById(String cartId) {
        return autoMapperService.map(cartRepository.findById(cartId).get(), CartModel.class);
    }

    @Override
    public int getAmount(CartModel cart) {
        AtomicReference<Integer> amount = new AtomicReference<>(0);
        cart.getItems().forEach(item -> {
            amount.updateAndGet(v -> v + item.getAmount());});
        return amount.get();
    }




}
