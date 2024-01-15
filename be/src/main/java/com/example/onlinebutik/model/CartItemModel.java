package com.example.onlinebutik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemModel {

    private String itemId;
    private int amount;
    private Double forPayment;
    private String size;

}
