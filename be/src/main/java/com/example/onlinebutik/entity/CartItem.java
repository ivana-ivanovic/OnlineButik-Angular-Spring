package com.example.onlinebutik.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    private String itemId;
    private int amount;
    private Double forPayment;
    private String size;

}
