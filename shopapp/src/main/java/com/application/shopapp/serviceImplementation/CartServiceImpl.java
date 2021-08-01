package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.CartSaveDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    ProductVariationRepository productVariationRepository;

    @Autowired
    OrderProductRepository orderProductRepository;

    @Override
    public String addToCart(CartSaveDto cartSaveDto){
        Cart saveCart =new Cart();
        saveCart.setQuantity(cartSaveDto.getQuantity());
        saveCart.setWishListItem(true);
        String email = userService.getUserName();
        Customer customer = customerRepository.findByEmail(email);
        saveCart.setCustomerUserId(customer);
        Optional<ProductVariation> productVariation = productVariationRepository.findById(cartSaveDto.getProductVariationId());
        saveCart.setProductVariation(productVariation.get());
        cartRepository.save(saveCart);
        return "Added";
    }

    @Override
    public void deleteCartItem(Long id){
        Optional<Cart> cart = cartRepository.findById(id);
        cartRepository.deleteCartItem(id);
    }

    @Override
    public Set<Cart> allCartProduct(){
        String email = userService.getUserName();
        Customer customer = customerRepository.findByEmail(email);
        Set<Cart> carts = cartRepository.findByCustomerUserId(customer.getId());
        return carts;
    }

    @Override
    public String OrderCartItem(Long id){

        Orders saveOrder = new Orders();
        String email = userService.getUserName();
        User user = userRepository.findByEmail(email);
        Address address = addressRepository.findByUserId(user.getId());
        saveOrder.setAddress(address);
        saveOrder.setDateCreated(new Date());
        saveOrder.setPaymentMethod("cash");
        saveOrder.setUser(user);
        Optional<Cart> cart = cartRepository.findById(id);
        Optional<ProductVariation> productVariation = productVariationRepository.findById(cart.get().getProductVariation().getId());
        Long quantity;
        quantity = productVariation.get().getQuantityAvailable() - cart.get().getQuantity();
        productVariation.get().setQuantityAvailable(quantity);
        saveOrder.setAmountPaid(productVariation.get().getPrice()* cart.get().getQuantity());
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrders(saveOrder);
        orderProduct.setPrice(productVariation.get().getPrice());
        orderProduct.setQuantity(cart.get().getQuantity());
        orderProduct.setProductVariation(productVariation.get());
        productVariationRepository.save(productVariation.get());
        orderRepository.save(saveOrder);
        orderProductRepository.save(orderProduct);
        return "order placed";
    }
}
