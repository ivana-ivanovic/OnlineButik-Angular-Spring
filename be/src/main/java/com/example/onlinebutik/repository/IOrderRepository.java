package com.example.onlinebutik.repository;

import com.example.onlinebutik.entity.Orders;
import com.example.onlinebutik.model.ItemsAmount;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface IOrderRepository extends MongoRepository<Orders, String> {
    List<Orders> findAllByUserId(String email);
    @Query("{ 'id_user': ?0 ,  'items.item.slug': ?1 }")
    List<Orders> findAllByUserIdAndItemsSlug(String email, String slug);
    @Query("{  'items.item.slug': ?0 }")
    List<Orders> findAllByItemsSlug( String slug);

}
