package com.food_ordering_system.orders_management.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class NotificationService {

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    public void notifyOrderStatusChange(String orderId, String status) {
        messagingTemplate.convertAndSend("/topic/order-status", Map.of("orderId", orderId, "status", status));
    }
}
