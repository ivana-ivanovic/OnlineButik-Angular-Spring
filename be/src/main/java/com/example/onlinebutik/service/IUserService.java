package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.UsersModel;

import java.util.List;

public interface IUserService {
    Users insert(UsersModel model);
    Users update(UsersModel model);
    Users findByEmail(String email);
    List<Users> findAll();

}
