package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.dto.DeliveryAgentRequestDto;
import com.food_ordering_system.orders_management.model.DeliveryAgent;
import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.repository.DeliveryAgentsRepository;
import com.food_ordering_system.orders_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class DeliveryAgentsService {

    @Autowired
    private DeliveryAgentsRepository deliveryAgentsRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<DeliveryAgent> getAllDeliveryAgents() {
        return deliveryAgentsRepository.findAll();
    }

    public DeliveryAgent createAgent(DeliveryAgent deliveryAgent) {
        return deliveryAgentsRepository.save(deliveryAgent);
    }

    public DeliveryAgent assignOrder(String agentId, DeliveryAgentRequestDto body) {
        DeliveryAgent agent = deliveryAgentsRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
        Order order = orderRepository.findById(body.getOrderId()).orElseThrow(() -> new RuntimeException("Order not found"));
        agent.setAssignedOrderId(order);
        return deliveryAgentsRepository.save(agent);
    }

    public DeliveryAgent updateLocation(String agentId,String location) {
        DeliveryAgent agent = deliveryAgentsRepository.findById(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
        agent.setLocation(location);
        return deliveryAgentsRepository.save(agent);
    }

    public DeliveryAgent getAgentsByOrderId(String orderId) {
        return deliveryAgentsRepository.findByAssignedOrderId(orderId);
    }

    public Optional<DeliveryAgent> getAgentByAgentId(String agentId) {
        return deliveryAgentsRepository.findById(agentId);
    }
}
