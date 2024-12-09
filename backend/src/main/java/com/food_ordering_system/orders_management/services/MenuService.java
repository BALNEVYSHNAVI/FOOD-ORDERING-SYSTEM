package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.dto.MenuRequestDto;
import com.food_ordering_system.orders_management.model.Category;
import com.food_ordering_system.orders_management.model.Menu;
import com.food_ordering_system.orders_management.repository.CategoryRepository;
import com.food_ordering_system.orders_management.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Menu addMenu(MenuRequestDto menu) {
        try {
            Category category = categoryRepository.findById(menu.getCategory()).orElseThrow(() -> new RuntimeException("Category not found"));
            Menu newMenu = new Menu();
            newMenu.setName(menu.getName());
            newMenu.setDescription(menu.getDescription());
            newMenu.setAvailability(menu.isAvailability());
            newMenu.setCategory(category);
            menu.setPrice(menu.getPrice());
            return menuRepository.save(newMenu);
        }
        catch(Exception e){
            throw e;
        }

    }

    public List<Menu> getMenus() {
        return menuRepository.findAll();
    }

    public List<Menu> getMenusByCategory(String category) {
        return menuRepository.findByCategory(category);
    }

    public Menu getMenusById(String menuId) {
        return menuRepository.findById(menuId).orElseThrow(() -> new RuntimeException("Menu not found"));
    }

    public Menu updateMenu(String id, Menu updatedMenu) {
        return menuRepository.findById(id).map(menu -> {
            menu.setName(updatedMenu.getName());
            menu.setCategory(updatedMenu.getCategory());
            menu.setDescription(updatedMenu.getDescription());
            menu.setPrice(updatedMenu.getPrice());
            menu.setAvailability(updatedMenu.isAvailability());
            return menuRepository.save(menu);
        }).orElseThrow(() -> new RuntimeException("Menu not found"));
    }

    public void deleteMenu(String id) {
        menuRepository.deleteById(id);
    }
}
