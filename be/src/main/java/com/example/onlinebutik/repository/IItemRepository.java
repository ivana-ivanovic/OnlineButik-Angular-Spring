package com.example.onlinebutik.repository;

import com.example.onlinebutik.entity.Items;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface IItemRepository extends MongoRepository<Items, String> {
    Items findBySlug(String slug);
    @Query("{ 'category': ?0 , 'type': ?1 }")
    List<Items> findAllByCategoryAndType(String category, String type);
    @Query("{ 'category': ?0 , 'type': ?1,  'price': {'$gt': ?2, '$lt': ?3 }}}")
    List<Items> getAllByPriceBetween(String category, String type, Double gtPrice, Double ltPrice);
}
