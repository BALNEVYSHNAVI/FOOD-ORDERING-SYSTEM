package com.food_ordering_system.orders_management.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "deleveryAgents")
public class DeliveryAgent {

    @Id
    private String agentId;
    private String name;
    private String contactInfo;
    private Order assignedOrderId; // Optional: Can be null if no order is assigned
    private String location; // Format: "latitude,longitude"

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public Order getAssignedOrderId() {
        return assignedOrderId;
    }

    public void setAssignedOrderId(Order assignedOrderId) {
        this.assignedOrderId = assignedOrderId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
