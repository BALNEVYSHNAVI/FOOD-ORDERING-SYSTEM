package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.dto.FeedbackRequestDto;
import com.food_ordering_system.orders_management.model.Feedback;
import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.model.User;
import com.food_ordering_system.orders_management.repository.FeedbackRepository;
import com.food_ordering_system.orders_management.repository.OrderRepository;
import com.food_ordering_system.orders_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Feedback addFeedback(FeedbackRequestDto body) {
        Feedback feedback = new Feedback();
        Order order = orderRepository.findById(body.getOrderId()).orElse(null);
        User user = userRepository.findById(body.getUserId()).orElse(null);
        feedback.setUserId(user);
        feedback.setOrderId(order);
        feedback.setComments(body.getComments());
        feedback.setRating(body.getRating());
        feedback.setDate(LocalDate.now().toString());
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getFeedbackByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return feedbackRepository.findByOrderId(order);
    }

    public List<Feedback> getFeedbacksByUserId(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return feedbackRepository.findByUserId(user);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
}
