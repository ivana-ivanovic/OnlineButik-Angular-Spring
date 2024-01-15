package com.example.onlinebutik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrdersModel {

    private String id;
    private String status;
    private String userId;
    private LocalDate orderDate;
    private Double totalPrice = 0.0;
    private List<OrdersItemModel> items;
    private String address;
    private String city;
    private String stars;

}
