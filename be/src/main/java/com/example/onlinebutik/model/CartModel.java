package com.example.onlinebutik.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartModel {
    public static String ORDERED = "ordered";
    public static String PENDING = "pending";

    private String id;
    private String status;
    private LocalDate lastModified;
    private LocalDate orderDate;
    private Double totalPrice = 0.0;
    private List<CartItemModel> items;




}
