package com.food_ordering_system.orders_management.controller;

import com.food_ordering_system.orders_management.dto.DeliveryAgentRequestDto;
import com.food_ordering_system.orders_management.dto.MenuRequestDto;
import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.DeliveryAgent;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.services.DeliveryAgentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-agents")
public class DeliveryAgentController {

    @Autowired
    private DeliveryAgentsService deliveryAgentsService;

    @PostMapping
    public ResponseEntity<Object> createAgent(@RequestBody DeliveryAgent deliveryAgent) {
        try{
            DeliveryAgent data = deliveryAgentsService.createAgent(deliveryAgent);
            return ResponseHelper.createResponse(HttpStatus.OK,"delivery agent created successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PostMapping("{agentId}/assign-order")
    public ResponseEntity<Object> assignOrderToAgent(@PathVariable String agentId, @RequestBody DeliveryAgentRequestDto body){
        try{
            DeliveryAgent data = deliveryAgentsService.assignOrder(agentId,body);
            return ResponseHelper.createResponse(HttpStatus.OK,"delvery agent assigned successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getAllDeliveryAgents(){
        try{
            List<DeliveryAgent> data = deliveryAgentsService.getAllDeliveryAgents();
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PostMapping("/{agentId}/update-location")
    public ResponseEntity<Object> updateLocation(@PathVariable String agentId, @RequestBody String body){
        try{
            DeliveryAgent data = deliveryAgentsService.updateLocation(agentId,body);
            return ResponseHelper.createResponse(HttpStatus.OK,"location updated successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{orderId}/order")
    public ResponseEntity<Object> getAgentByOrderId(@PathVariable String orderId){
        try{
            DeliveryAgent data = deliveryAgentsService.getAgentsByOrderId(orderId);
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{agentId}/agent")
    public ResponseEntity<Object> getAgentByAgentId(@PathVariable String agentId){
        try{
            Optional<DeliveryAgent> data = deliveryAgentsService.getAgentByAgentId(agentId);
            return ResponseHelper.createResponse(HttpStatus.OK,"data retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }
}
