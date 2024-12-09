package com.food_ordering_system.orders_management.repository;

import com.food_ordering_system.orders_management.model.DeliveryAgent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeliveryAgentsRepository extends MongoRepository<DeliveryAgent,String> {

    DeliveryAgent findByAssignedOrderId(String assignedOrderId);
}
