package com.example.onlinebutik.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Data
@Document(collection = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
    @Id
    private String id;
    @Field("status")
    @NotBlank
    private String status;
    @Field("id_user")
    @NotBlank
    private String userId;
    @Field("order_date")
    private LocalDate orderDate;
    @Field("total_price")
    @NotBlank
    private Double totalPrice = 0.0;
    @Field("items")
    @NotBlank
    private List<OrdersItem> items;
    @Field("address")
    @NotBlank
    private String address;
    @Field("city")
    @NotBlank
    private String city;
    @Field("stars")
    private String stars;
}
