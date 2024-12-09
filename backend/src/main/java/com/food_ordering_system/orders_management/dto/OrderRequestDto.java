package com.food_ordering_system.orders_management.dto;

import com.food_ordering_system.orders_management.model.Menu;

import java.util.List;

public class OrderRequestDto {

    private String userId;
    private String orderDate;
    private String status;  // Pending, Preparing, Delivered
    private String paymentMethod;
    private List<Menu> menuItem;

    public List<Menu> getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(List<Menu> menuItem) {
        this.menuItem = menuItem;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
