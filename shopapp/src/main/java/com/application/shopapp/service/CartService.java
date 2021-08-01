package com.application.shopapp.service;

import com.application.shopapp.dtos.CartSaveDto;
import com.application.shopapp.entities.Cart;

import java.util.Set;

public interface CartService {

    String addToCart(CartSaveDto cartSaveDto);

    void deleteCartItem(Long id);

    Set<Cart> allCartProduct();

    String OrderCartItem(Long id);
}
