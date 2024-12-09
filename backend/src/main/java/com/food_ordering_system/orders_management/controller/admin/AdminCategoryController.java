package com.food_ordering_system.orders_management.controller.admin;

import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.Category;
import com.food_ordering_system.orders_management.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Object> addCategories(@RequestBody Category category){
        try{
            Category data = categoryService.addCategory(category);
            return ResponseHelper.createResponse(HttpStatus.OK,"Category created successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getMenus(){
        try{
            List<Category> data = categoryService.getCategories();
            return ResponseHelper.createResponse(HttpStatus.OK,"category retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @PatchMapping("/{categoryId}")
    public ResponseEntity<Object> getMenus(@PathVariable String categoryId, @RequestBody Category category){
        try{
            Category data = categoryService.updateMenu(categoryId, category);
            return ResponseHelper.createResponse(HttpStatus.OK,"category updated successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<Object> getCategoryById(@PathVariable String categoryId){
        try{
            Category data = categoryService.getCategoryById(categoryId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Category retrieved successfully",data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Object> deleteMenuById(@PathVariable String categoryId){
        try{
            categoryService.deleteCategory(categoryId);
            return ResponseHelper.createResponse(HttpStatus.OK,"Category deleted successfully",true,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.BAD_REQUEST,e.getMessage(),false,null);
        }
    }
}
