package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.model.Category;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(Category menu) {
        return categoryRepository.save(menu);
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public List<Category> getMenusByCategory(String category) {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(String categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("category not found"));
    }

    public Category updateMenu(String id, Category updatedMenu) {
        return categoryRepository.findById(id).map(menu -> {
            menu.setName(updatedMenu.getName());
            menu.setDescription(updatedMenu.getDescription());
            return categoryRepository.save(menu);
        }).orElseThrow(() -> new RuntimeException("category not found"));
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }
}
