package com.example.onlinebutik.repository;


import com.example.onlinebutik.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ICartRepository extends MongoRepository<Cart, String> {

}
