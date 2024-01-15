package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Orders;
import com.example.onlinebutik.model.OrdersModel;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface IOrderService {
    Orders insert(OrdersModel model);
    List<Orders> findAllByUserId(String email);
    Orders update(OrdersModel model);
    Boolean isOrderedItemByEmalAndSlug(String email, String slug);
    void deleteByOrderId(String orderId);
    List<Items> otherBoughtItems(String slug);
}
