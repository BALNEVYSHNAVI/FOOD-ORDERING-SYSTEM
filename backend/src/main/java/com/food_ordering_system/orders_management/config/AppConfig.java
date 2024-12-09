package com.food_ordering_system.orders_management.config;

import com.food_ordering_system.orders_management.util.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public JwtUtil jwtUtil(){
        return new JwtUtil();
    }
}
