package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Orders;
import com.example.onlinebutik.model.OrdersModel;
import com.example.onlinebutik.repository.IOrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IOrderService{

    @Autowired
    private IOrderRepository orderRepository;
    @Autowired
    private AutoMapperService autoMapperService;

    @Override
    public Orders insert(OrdersModel model){
        return orderRepository.insert(autoMapperService.map(model, Orders.class));
    }

    @Override
    public List<Orders> findAllByUserId(String email) {
        return  orderRepository.findAllByUserId(email);
    }

    @Override
    public Orders update(OrdersModel model) {
        return orderRepository.save(autoMapperService.map(model, Orders.class));
    }

    @Override
    public Boolean isOrderedItemByEmalAndSlug(String email, String slug) {
        List<Orders> list = this.orderRepository.findAllByUserIdAndItemsSlug(email, slug);
        if(list.size() > 0) { return true; }
        else { return  false; }
    }

    @Override
    public void deleteByOrderId(String orderId) {
        this.orderRepository.deleteById(orderId);
    }

    @Override
    public List<Items> otherBoughtItems(String slug) {
        List<Orders> listOrders = this.orderRepository.findAllByItemsSlug(slug);
        List<Items> listItems = new ArrayList<>();
        listOrders.forEach(o -> {
            o.getItems().forEach( ordersItem -> {
                listItems.add(ordersItem.getItem());
            });
        });
        return listItems;
    }


}
