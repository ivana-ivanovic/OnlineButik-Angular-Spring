package com.example.onlinebutik.controller;

import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Orders;
import com.example.onlinebutik.model.OrdersModel;
import com.example.onlinebutik.service.OrderService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("insert")
    @CrossOrigin("*")
    public Orders insert(@RequestBody OrdersModel order){
        return orderService.insert(order);
    }

    @GetMapping("findallbyiduser/{email}")
    @CrossOrigin("*")
    public List<Orders> findAllByUserId(@PathVariable String email){
        return orderService.findAllByUserId( email);
    }

    @PostMapping("update")
    @CrossOrigin("*")
    public Orders update(@RequestBody OrdersModel order) {
        return orderService.update(order);
    }

    @PostMapping("isordereditembyemalandslug")
    @CrossOrigin("*")
    public Boolean isOrderedItemByEmalAndSlug(@RequestBody String requestData){
        JSONObject data = new JSONObject(requestData);
        String email = (String) data.get("email");
        String slug = (String) data.get("slug");
        return  this.orderService.isOrderedItemByEmalAndSlug(email,slug);
    }

    @GetMapping("delete/{orderId}")
    @CrossOrigin("*")
    public void deleteByOrderId(@PathVariable String orderId){
        this.orderService.deleteByOrderId(orderId);
    }

    @GetMapping("otherboughtitems/{slug}")
    @CrossOrigin("*")
    public List<Items> otherBoughtItems(@PathVariable String slug){
        return orderService.otherBoughtItems( slug);
    }
}
