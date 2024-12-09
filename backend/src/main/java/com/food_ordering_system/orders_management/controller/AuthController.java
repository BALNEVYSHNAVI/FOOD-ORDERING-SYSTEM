package com.food_ordering_system.orders_management.controller;

import com.food_ordering_system.orders_management.dto.LoginRequestDto;
import com.food_ordering_system.orders_management.dto.RegisterRequestDto;
import com.food_ordering_system.orders_management.helpers.ResponseHelper;
import com.food_ordering_system.orders_management.model.User;
import com.food_ordering_system.orders_management.repository.UserRepository;
import com.food_ordering_system.orders_management.services.AuthService;
import com.food_ordering_system.orders_management.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @GetMapping("/check")
    public ResponseEntity<String> Check() {
        return ResponseEntity.ok("Ok");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto body) {
        try {
            System.out.println(body);
            Optional<User> user = userRepository.findByEmail(body.getEmail());

            if (user.isEmpty() || !new BCryptPasswordEncoder().matches(body.getPassword(), user.get().getPasswordHash())) {
                return ResponseHelper.createErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid Credentials",false,null);
            }
            String token = jwtUtil.generateToken(user.get().getEmail(), user.get().getRole(),user.get().getEmail(),user.get().getUserId());
            return ResponseHelper.createResponse(HttpStatus.OK, "Login successful", token,null);

        } catch (Exception e) {
            return ResponseHelper.createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(),false,null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequestDto userRequestDto){
        try{
            User registerUser = authService.singUp(userRequestDto);
            userRepository.save(registerUser);
            return ResponseHelper.createResponse(HttpStatus.OK, "Successfully registered", true,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage(),false,null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserDetails(@PathVariable String userId){
        try{
            Optional<User> data = authService.getUserDetails(userId);
            return ResponseHelper.createResponse(HttpStatus.OK, "Successfully registered", data,null);
        }catch (Exception e){
            return ResponseHelper.createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,e.getMessage(),false,null);
        }
    }
}
