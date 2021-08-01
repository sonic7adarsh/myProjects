package com.application.shopapp.repository;

import com.application.shopapp.entities.Cart;
import com.application.shopapp.entities.OrderProduct;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface OrderProductRepository extends CrudRepository<OrderProduct, Long> {

    @Modifying
    @Transactional
    @Query(value = "delete from order_product where order_id =:uid",nativeQuery = true)
    void deleteOrder(@Param("uid") Long id);

    @Query(value = "select * from order_product where order_id =:uid",nativeQuery = true)
    OrderProduct findOrder(@Param("uid")Long id);

}
