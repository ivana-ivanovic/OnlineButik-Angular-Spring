package com.example.onlinebutik.controller;


import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.ItemsModel;
import com.example.onlinebutik.service.ItemService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("findallbycategoryandtype")
    @CrossOrigin("*")
    public List<ItemsModel> findAllByCategoryAndType(String category,   String type){
        return itemService.findAllByCategoryAndType( category, type );
    }

    @GetMapping("findbyslug/{slug}")
    @CrossOrigin("*")
    public ItemsModel findBySlug( @PathVariable String slug ){ return itemService.findBySlug(slug ); }

    @GetMapping("findbyid/{id}")
    @CrossOrigin("*")
    public ItemsModel findById(@PathVariable  String id) { return  itemService.findById(id); }

    @PostMapping("updateitemstars")
    @CrossOrigin("*")
    public ItemsModel updateItemStars(@RequestBody Items item) { return  itemService.updateItemStars(item); }

    @PostMapping("getfavouriteitems")
    @CrossOrigin("*")
    public List<ItemsModel>  getFavouriteItems(@RequestBody Users user) { return  itemService.getFavouriteItems(user); }

    @PostMapping("updateitemamount")
    @CrossOrigin("*")
    public ItemsModel updateItemAmount(@RequestBody String requestData){
        JSONObject data = new JSONObject(requestData);
        String itemId = (String) data.get("itemId");
        String size = (String) data.get("size");
        Integer amount = (Integer)  data.get("amount");
        return itemService.updateItemAmount( itemId, size,  amount);
    }

    @GetMapping("getsimilaritems/{id}")
    @CrossOrigin("*")
    public List<ItemsModel> getSimilarItems(@PathVariable String id){
        return itemService.getSimilarItems( id );
    }

}


