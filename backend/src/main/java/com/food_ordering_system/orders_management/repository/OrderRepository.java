package com.food_ordering_system.orders_management.repository;

import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {

    List<Order> findByOrderDate(String orderData);

    List<Order> findByStatus(String status);

    List<Order> findByUserId(User userId);

}
