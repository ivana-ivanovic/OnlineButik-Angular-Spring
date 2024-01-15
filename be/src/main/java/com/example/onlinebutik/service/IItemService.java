package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.CartModel;
import com.example.onlinebutik.model.ItemsModel;

import java.util.List;

public interface IItemService {

    ItemsModel findBySlug(String slug);
    List<ItemsModel>findAllByCategoryAndType(String category, String type);
    List<ItemsModel>findAll();
    ItemsModel findById(String id);
    List<ItemsModel> findAllByCart(CartModel cart);
    ItemsModel updateItemAmount(String itemId, String size, Integer amount);
    List<ItemsModel> getSimilarItems(String id);
    List<ItemsModel> getFavouriteItems(Users user);
    ItemsModel updateItemStars(Items item);

}
