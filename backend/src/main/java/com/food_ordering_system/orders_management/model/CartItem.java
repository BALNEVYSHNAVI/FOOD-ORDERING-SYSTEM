package com.food_ordering_system.orders_management.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cartItems")
public class CartItem {

    private String itemId;
    private String name;
    private Double price;
    private Integer quantity;
}
