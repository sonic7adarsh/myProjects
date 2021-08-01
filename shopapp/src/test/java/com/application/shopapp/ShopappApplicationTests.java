package com.application.shopapp;

import com.application.shopapp.dtos.CartSaveDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.UserService;
import com.application.shopapp.serviceImplementation.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@SpringBootTest
class ShopappApplicationTests {

	@Test
	void contextLoads() {
	}


	@Autowired(required = true)
	UserRepository userRepository;

	@Test
	public void  Detail() {
		User user = userRepository.findByEmail("adarshsoni284@gmail.com");
		System.out.println(user.getFirstName());
	}

//	@Autowired
//	UserServiceImpl userService;
//
	@Autowired
	OrderRepository orderRepository;

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	ProductVariationRepository productVariationRepository;

	@Autowired
	CartRepository cartRepository;

	@Test
	public void getOrders(){
//		String email = userService.getUserName();
		User user = userRepository.findByEmail("adarshsoni284@gmail.com");
		System.out.println(user.getFirstName());
		System.out.println(orderRepository.findByCustomerUserId(user.getId()));
	}

	@Test
	public void addToCart(){
		Cart saveCart =new Cart();
		saveCart.setQuantity(1L);
		saveCart.setWishListItem(true);
		Customer customer = customerRepository.findByEmail("adarshsoni284@gmail.com");
		saveCart.setCustomerUserId(customer);
		Optional<ProductVariation> productVariation = productVariationRepository.findById(22L);
		saveCart.setProductVariation(productVariation.get());

		cartRepository.save(saveCart);

		System.out.println("added");
	}

	@Autowired
	OrderProductRepository orderProductRepository;
	@Test
//	@Transactional
	public void deleteCartItem(){
		OrderProduct orderProduct = new OrderProduct();
//        orderProduct.setOrders(saveOrder);
		orderProduct.setPrice(12202l);
		orderProduct.setQuantity(2l);
//		orderProduct.setProductVariation(productVariation.get());
		orderProductRepository.save(orderProduct);
	}
}

