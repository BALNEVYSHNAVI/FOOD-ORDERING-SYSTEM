package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.dto.OrderRequestDto;
import com.food_ordering_system.orders_management.dto.OrderStatusRequestDto;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.model.User;
import com.food_ordering_system.orders_management.repository.MenuRepository;
import com.food_ordering_system.orders_management.repository.OrderRepository;
import com.food_ordering_system.orders_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenuRepository menuRepository;


    public void createOrder(List<OrderRequestDto> body) {
        // Logic to calculate total price, add items, etc.

        try{
            for(OrderRequestDto order : body){
                User user = userRepository.findById(order.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found"));
//                orderRepository.save(order);

//                 Validate and retrieve menu items
                List<Menu> menuItems = new ArrayList<>();
                Order newOrder = new Order();
                for (Menu menu : order.getMenuItem()) {
                    Menu menuItem = menuRepository.findById(menu.getMenuId())
                            .orElseThrow(() -> new RuntimeException("Menu item not found: " + menu.getMenuId()));
                    menuItems.add(menuItem);
                }

                // Calculate the total price based on menu item prices and their quantities
                double totalPrice = menuItems.stream()
                        .mapToDouble(menuItem -> menuItem.getPrice())
                        .sum();

                // Set updated fields for the order
                newOrder.setUserId(user);
                newOrder.setMenuItem(menuItems);
                newOrder.setTotalPrice(totalPrice);
                newOrder.setOrderDate(order.getOrderDate()); // Assuming the date is provided in the request
                newOrder.setStatus("Pending"); // Default status
                newOrder.setPaymentMethod(order.getPaymentMethod());

                // Save the order to the database
                orderRepository.save(newOrder);
            }
        }catch (Exception e){
            throw e;
        }
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public List<Order> getOrdersByUserId(String orderId) {
        User user = userRepository.findById(orderId).orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserId(user);
    }

    public Order updateOrderStatus(String orderId, OrderStatusRequestDto body) {
        try{
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus(body.getStatus());
            return orderRepository.save(order);
        }catch (Exception e){
            throw e;
        }
    }

    public List<Order> getActiveOrders() {
        return orderRepository.findByStatus("Preparing");
    }
}
