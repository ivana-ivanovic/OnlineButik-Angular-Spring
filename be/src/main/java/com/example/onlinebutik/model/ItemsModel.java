package com.example.onlinebutik.model;

import com.example.onlinebutik.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemsModel {

    private String id;
    private String name;
    private String image;
    private String category;
    private String type;
    private List<Size> amount;
    private Double stars;
    private Double price;
    private String description;
    private String country;
    private String slug;

}

