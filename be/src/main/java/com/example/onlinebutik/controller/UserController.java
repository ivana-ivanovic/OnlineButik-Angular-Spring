package com.example.onlinebutik.controller;

import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.UsersModel;
import com.example.onlinebutik.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("findall")
    @CrossOrigin("*")
    public List<Users> findAll(){
        return userService.findAll();
    }

    @PostMapping("insert")
    @CrossOrigin("*")
    public Users insert(@RequestBody UsersModel user){
        return userService.insert(user);
    }

    @PostMapping("update")
    @CrossOrigin("*")
    public Users save(@RequestBody UsersModel user){
        return userService.update(user);
    }

    @GetMapping("findbyemail/{email}")
    @CrossOrigin("*")
    public Users findByEmail(@PathVariable String email){
        return userService.findByEmail(email);
    }

}




