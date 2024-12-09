package com.food_ordering_system.orders_management.controller;


import com.food_ordering_system.orders_management.dto.MenuRequestDto;
import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/app/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping("/create-menu")
    public ResponseEntity<Object> addMenu(@RequestBody MenuRequestDto menu) {
        try {
            System.out.println("Request to create menu: " + menu);
            Menu data = menuService.addMenu(menu);
            return ResponseHelper.createResponse(HttpStatus.OK, "Menu created successfully", data, null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), false, null);
        }
    }


    @GetMapping
    public ResponseEntity<Object> getMenus(){
        try{
            List<Menu> data = menuService.getMenus();
            return ResponseHelper.createResponse(HttpStatus.OK,"Menus retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PatchMapping("/{menuId}")
    public ResponseEntity<Object> getMenus(@PathVariable String menuId,@RequestBody Menu updatedMenu){
        try{
            Menu data = menuService.updateMenu(menuId, updatedMenu);
            return ResponseHelper.createResponse(HttpStatus.OK,"Menu updated successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{categoryId}/category")
    public ResponseEntity<Object> updateMenus(@PathVariable String categoryId){
        try{
            List<Menu> data = menuService.getMenusByCategory(categoryId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Menu retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{menuId}")
    public ResponseEntity<Object> getMenuById(@PathVariable String menuId){
        try{
            Menu data = menuService.getMenusById(menuId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Menu retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @DeleteMapping("/{menuId}")
    public ResponseEntity<Object> deleteMenuById(@PathVariable String menuId){
        try{
            menuService.deleteMenu(menuId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Menu deleted successfully",true,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }
}
