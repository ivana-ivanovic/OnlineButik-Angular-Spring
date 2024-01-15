package com.example.onlinebutik.repository;

import com.example.onlinebutik.entity.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IUserRepository extends MongoRepository<Users, String> {
    Users findByEmail(String email);

}
