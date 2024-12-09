package com.food_ordering_system.orders_management.repository;

import com.food_ordering_system.orders_management.model.Menu;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MenuRepository extends MongoRepository<Menu,String> {
    List<Menu> findByCategory(String category);

//    List<Menu> findByMenuId(Iterable<String> menuId);
}
