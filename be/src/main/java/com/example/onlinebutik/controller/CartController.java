package com.example.onlinebutik.controller;

import com.example.onlinebutik.model.CartModel;
import com.example.onlinebutik.model.ItemsModel;
import com.example.onlinebutik.service.CartService;
import com.example.onlinebutik.service.ItemService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private ItemService itemService;

    @PostMapping("addtocart")
    @CrossOrigin("*")
    public CartModel addToCart(@RequestBody String requestData){
        JSONObject data = new JSONObject(requestData);
        String cartId = (String)  data.get("cartId");
        String itemId = (String) data.get("itemId");
        String size = (String)  data.get("size");
        return cartService.addToCart(cartId,  itemId,  size);
    }

    @PostMapping("removefromcart")
    @CrossOrigin("*")
    public CartModel removeFromCart(@RequestBody String requestData){
        JSONObject data = new JSONObject(requestData);
        String cartId = (String)  data.get("cartId");
        String itemId = (String) data.get("itemId");
        String size = (String) data.get("size");
        return cartService.removeFromCart(cartId, itemId, size);
    }

    @PostMapping("forpayment")
    @CrossOrigin("*")
    public Double forPayment(@RequestBody CartModel cart){
        return cartService.forPayment(cart);
    }

    @PostMapping("createcart")
    @CrossOrigin("*")
    public CartModel createCart(@RequestBody String requestData){
        JSONObject data = new JSONObject(requestData);
        String itemId = (String) data.get("itemId");
        String size = (String)  data.get("size");
        return cartService.createCart( itemId,  size);
    }

    @PostMapping("emptycart")
    @CrossOrigin("*")
    public CartModel emptyCart(@RequestBody CartModel cart){
        return cartService.emptyCart(cart);
    }

    @PostMapping("updateorderedcart")
    @CrossOrigin("*")
    public CartModel updateOrderedCart(@RequestBody CartModel cart){
        return cartService.updateOrderedCart(cart);
    }

    @GetMapping("findbyid/{cartId}")
    @CrossOrigin("*")
    public CartModel findById(@PathVariable String cartId){
        return  cartService.findById(cartId);
    }

    @PostMapping("getamount")
    @CrossOrigin("*")
    public int getAmount(@RequestBody CartModel cart){
        return cartService.getAmount(cart);
    }

    @PostMapping("findallitems")
    @CrossOrigin("*")
    public List<ItemsModel> findAllItems(@RequestBody CartModel cart){ return itemService.findAllByCart(cart); }



}
