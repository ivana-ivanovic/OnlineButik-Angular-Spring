package com.example.onlinebutik.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersItem {

    private Items item;
    private Integer amount;
    private Double forPayment;
    private String size;
}
