package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.OrderDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.OrderService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLOutput;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    ProductVariationRepository productVariationRepository;

    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderProductRepository orderProductRepository;


    @Override
    public String addOrder(Long id){
//        Orders saveOrder = new Orders();
//        String email = userService.getUserName();
//        User user = userRepository.findByEmail(email);
//        Address address = addressRepository.findByUserId(user.getId());
//        saveOrder.setAddress(address);
//        saveOrder.setDateCreated(new Date());
//        saveOrder.setPaymentMethod("cash");
//        saveOrder.setUser(user);
//        Optional<ProductVariation> productVariation = productVariationRepository.findById(cart.get().getProductVariation().getId());
//        Long quantity;
//        quantity = productVariation.get().getQuantityAvailable() - cart.get().getQuantity();
//        productVariation.get().setQuantityAvailable(quantity);
//        saveOrder.setAmountPaid(productVariation.get().getPrice()* cart.get().getQuantity());
//        OrderProduct orderProduct = new OrderProduct();
//        orderProduct.setOrders(saveOrder);
//        orderProduct.setPrice(productVariation.get().getPrice());
//        orderProduct.setQuantity(cart.get().getQuantity());
//        orderProduct.setProductVariation(productVariation.get());
//        productVariationRepository.save(productVariation.get());
//        orderRepository.save(saveOrder);
//        orderProductRepository.save(orderProduct);
        return "order successful";
    }

    @Override
    public String cancelOrder(Long id){
        OrderProduct orderProduct = orderProductRepository.findOrder(id);
        Optional<ProductVariation> productVariation = productVariationRepository.findById(orderProduct.getProductVariation().getId());
        Long quantity;
        quantity = productVariation.get().getQuantityAvailable() + orderProduct.getQuantity();
        productVariation.get().setQuantityAvailable(quantity);
        productVariationRepository.save(productVariation.get());
        orderProductRepository.deleteOrder(id);
        orderRepository.deleteOrderItem(id);
        return "Order Deleted";
    }

    @Override
    public Set<Orders> getOrders(){
        String email = userService.getUserName();
        User user = userRepository.findByEmail(email);
        return orderRepository.findByCustomerUserId(user.getId());
    }
}
