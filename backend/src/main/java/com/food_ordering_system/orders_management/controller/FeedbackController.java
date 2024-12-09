package com.food_ordering_system.orders_management.controller;

import com.food_ordering_system.orders_management.dto.FeedbackRequestDto;
import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.DeliveryAgent;
import com.food_ordering_system.orders_management.model.Feedback;
import com.food_ordering_system.orders_management.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Object> addFeedback(@RequestBody FeedbackRequestDto body) {
        try{
            Feedback data = feedbackService.addFeedback(body);
            return ResponseHelper.createResponse(HttpStatus.OK,"feedback added successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Object> getFeedbackByOrderId(@PathVariable String orderId) {
        try{
            List<Feedback> data = feedbackService.getFeedbackByOrderId(orderId);
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getFeedbackByUserId(@PathVariable String userId) {
        try{
            List<Feedback> data = feedbackService.getFeedbackByOrderId(userId);
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllFeedbacks() {
        try{
            List<Feedback> data = feedbackService.getAllFeedbacks();
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }
}
