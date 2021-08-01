package com.application.shopapp.repository;

import com.application.shopapp.entities.Cart;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface CartRepository extends CrudRepository<Cart, Long> {

    @Query(value = "select * from cart where customer_user_id =:uid",nativeQuery = true)
    Set<Cart> findByCustomerUserId(@Param("uid")Long id);

    @Modifying
    @Transactional
    @Query(value = "delete from cart where id =:uid",nativeQuery = true)
    void deleteCartItem(@Param("uid") Long id);
}
