package com.example.onlinebutik.service;


import com.example.onlinebutik.entity.Items;
import com.example.onlinebutik.entity.Users;
import com.example.onlinebutik.model.CartModel;
import com.example.onlinebutik.model.ItemsModel;
import com.example.onlinebutik.repository.IItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService implements  IItemService {

    private static final Double RANGESIMILAR = 200.00;

    @Autowired
    private IItemRepository itemRepository;
    @Autowired
    private AutoMapperService autoMapperService;

    @Override
    public ItemsModel findById(String id) {
        if(itemRepository.findById(id).isPresent())
            return autoMapperService.map(itemRepository.findById(id).get(), ItemsModel.class);
        return new ItemsModel();
    }

    @Override
    public List<ItemsModel> findAllByCart(CartModel cart) {
        List<ItemsModel> list = new ArrayList<ItemsModel>();
        cart.getItems().forEach(cartItemModel -> {
            if(itemRepository.findById(cartItemModel.getItemId()).isPresent())
                list.add(autoMapperService.map(
                        itemRepository.findById(cartItemModel.getItemId()).get(), ItemsModel.class));
        });
        return list.stream().distinct().collect(Collectors.toList());
    }

    @Override
    public ItemsModel updateItemAmount(String itemId, String size, Integer amount) {
        Items i = autoMapperService.map(this.findById(itemId), Items.class);
        i.getAmount().forEach(s->{
            if (s.getName().equals(size)){
                s.setAmount(s.getAmount()-amount);
            }
        });
        return autoMapperService.map(itemRepository.save(i), ItemsModel.class);
    }

    @Override
    public List<ItemsModel> getSimilarItems(String id) {
        ItemsModel item = this.findById(id);
        Double gt = item.getPrice() - ItemService.RANGESIMILAR;
        Double lt = item.getPrice() + ItemService.RANGESIMILAR;
        List<Items> items = itemRepository.getAllByPriceBetween(item.getCategory(), item.getType(), gt, lt);
        List<ItemsModel> models = new ArrayList<ItemsModel>(); ;
        items.forEach(i -> {
            models.add(autoMapperService.map(i, ItemsModel.class));
        });
        return models;
    }

    @Override
    public List<ItemsModel> getFavouriteItems(Users user) {
        List<ItemsModel> items = new ArrayList<>();
        user.getFavouriteItems().forEach(itemId -> {
            ItemsModel i = this.findById(itemId);
            items.add(i);
        });
        return items;
    }

    @Override
    public ItemsModel updateItemStars(Items item) {
        return autoMapperService.map(itemRepository.save(item), ItemsModel.class);
    }

    @Override
    public ItemsModel findBySlug(String slug) {
        return autoMapperService.map(itemRepository.findBySlug(slug), ItemsModel.class);
    }

    @Override
    public List<ItemsModel> findAllByCategoryAndType(String category, String type) {
        List<Items> items = itemRepository.findAllByCategoryAndType(category, type);
        List<ItemsModel> models = new ArrayList<ItemsModel>(); ;
        items.forEach(item -> {
           models.add(autoMapperService.map(item, ItemsModel.class));
        });
        return models;
    }

    public List<ItemsModel>findAll() {
        List<Items> items = itemRepository.findAll();
        List<ItemsModel> models = new ArrayList<ItemsModel>(); ;
        items.forEach(item -> {
            models.add(autoMapperService.map(item, ItemsModel.class));
        });
        return models;
    }

}
