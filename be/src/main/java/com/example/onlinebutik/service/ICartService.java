package com.example.onlinebutik.service;

import com.example.onlinebutik.model.CartModel;

public interface ICartService {
    CartModel addToCart(String cartId, String itemId, String size);
    CartModel removeFromCart(String cartId, String itemId, String size);
    Double forPayment(CartModel cart);
    CartModel createCart( String itemId, String size);
    CartModel emptyCart(CartModel cart);
    CartModel updateOrderedCart(CartModel cart);
    CartModel findById(String cartId);
    int getAmount(CartModel cart);
}
