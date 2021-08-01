package com.application.shopapp.service;

import com.application.shopapp.dtos.OrderDto;
import com.application.shopapp.entities.Orders;

import java.util.Set;

public interface OrderService {

    Set<Orders> getOrders();

    String cancelOrder(Long id);

    String addOrder(Long id);
}
