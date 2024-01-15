package com.example.onlinebutik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersItemModel {

    private ItemsModel item;
    private Integer amount;
    private Double forPayment;
    private String size;
}
