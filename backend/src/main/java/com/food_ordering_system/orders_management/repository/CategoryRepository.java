package com.food_ordering_system.orders_management.repository;

import com.food_ordering_system.orders_management.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category,String> {

    Optional<Category> findByName(String name);
}
