package com.application.shopapp.repository;

import com.application.shopapp.entities.Orders;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface OrderRepository extends CrudRepository<Orders, Long> {

    @Query(value = "select * from orders where customer_user_id =:uid",nativeQuery = true)
    Set<Orders> findByCustomerUserId(@Param("uid")Long id);

    @Modifying
    @Transactional
    @Query(value = "delete from orders where id =:uid",nativeQuery = true)
    void deleteOrderItem(@Param("uid") Long id);
}
