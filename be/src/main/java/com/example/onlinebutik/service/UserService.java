package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.UsersModel;
import com.example.onlinebutik.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private AutoMapperService autoMapperService;

    @Override
    public Users insert(UsersModel model){
        return userRepository.insert(autoMapperService.map(model, Users.class));
    }
    @Override
    public Users update(UsersModel model){
        return userRepository.save(autoMapperService.map(model,Users.class));
    }
    @Override
    public List<Users> findAll() {  return userRepository.findAll(); }
    @Override
    public Users findByEmail(String email) { return  userRepository.findByEmail(email);}


}
