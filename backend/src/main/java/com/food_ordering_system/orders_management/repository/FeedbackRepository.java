package com.food_ordering_system.orders_management.repository;


import com.food_ordering_system.orders_management.model.Feedback;
import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback,String> {
    List<Feedback> findByOrderId(Order order);
    List<Feedback> findByUserId(User user);
}
