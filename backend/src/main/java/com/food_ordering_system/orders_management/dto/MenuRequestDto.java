package com.food_ordering_system.orders_management.dto;

import com.food_ordering_system.orders_management.model.Category;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class MenuRequestDto {

    private String name;
    private String category; // Appetizers, Main Course, Beverages, Desserts
    private String description;
    private double price;
    private boolean availability;
    private String createdBy;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
