package com.food_ordering_system.orders_management.controller;


import com.food_ordering_system.orders_management.dto.MenuRequestDto;
import com.food_ordering_system.orders_management.dto.OrderRequestDto;
import com.food_ordering_system.orders_management.dto.OrderStatusRequestDto;
import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.model.Order;
import com.food_ordering_system.orders_management.services.NotificationService;
import com.food_ordering_system.orders_management.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Object> addOrder(@RequestBody List<OrderRequestDto> order){
        try{
            orderService.createOrder(order);
            return ResponseHelper.createResponse(HttpStatus.OK,"Menu created successfully",true,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllOrders(){
        try{
            List<Order> data = orderService.getAllOrders();
            return ResponseHelper.createResponse(HttpStatus.OK,"Menus retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<Object> getActiveOrders(){
        try{
            List<Order> data = orderService.getActiveOrders();
            return ResponseHelper.createResponse(HttpStatus.OK,"orders retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PatchMapping("/{orderId}")
    public ResponseEntity<Object> updateOrderById(@PathVariable String orderId,@RequestBody OrderStatusRequestDto status){
        try{
            Order data = orderService.updateOrderStatus(orderId, status);
            return ResponseHelper.createResponse(HttpStatus.OK,"order updated successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Object> getOrderById(@PathVariable String orderId){
        try{
            Order data = orderService.getOrderById(orderId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Order retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getOrderByUserId(@PathVariable String userId){
        try{
            List<Order> data = orderService.getOrdersByUserId(userId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Order retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Object> updateOrderStatus(@PathVariable String orderId, @RequestBody OrderStatusRequestDto status){
        try{
            Order data = orderService.updateOrderStatus(orderId,status);
//            notificationService.notifyOrderStatusChange(orderId,status);
            return ResponseHelper.createResponse(HttpStatus.OK,"Order Status updated successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

//    @DeleteMapping("/{menuId}")
//    public ResponseEntity<Object> deleteMenuById(@PathVariable String menuId){
//        try{
//            orderService.dele(menuId);
//            return ResponseHelper.createResponse(HttpStatus.OK,"Menu deleted successfully",true,null);
//        }catch (Exception e){
//            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
//        }
//    }
}
