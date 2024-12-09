package com.food_ordering_system.orders_management.services;

import com.food_ordering_system.orders_management.dto.RegisterRequestDto;
import com.food_ordering_system.orders_management.model.User;
import com.food_ordering_system.orders_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getAdminId(){
        return userRepository.findByRole("ADMIN").orElseThrow(() -> new RuntimeException("admin not found"));
    }

    public User singUp(RegisterRequestDto dto){

        Optional<User> existingUser = userRepository.findByEmail(dto.getEmail());
        if(existingUser.isPresent()){
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPasswordHash(encodePassword(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());

        return user;
    }

    public Optional<User> getUserDetails(String userId){
        return userRepository.findById(userId);
    }

    public String encodePassword(String password){
        return new BCryptPasswordEncoder().encode(password);
    }
}
