package com.example.onlinebutik.entity;

import com.example.onlinebutik.model.CartItemModel;
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
@Document(collection = "cart")
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    private String id;
    @Field("status")
    @NotBlank
    private String status;
    @Field("last_modified")
    @NotBlank
    private LocalDate lastModified;
    @Field("order_date")
    private LocalDate orderDate;
    @Field("total_price")
    @NotBlank
    private Double totalPrice = 0.0;
    @Field("items")
    @NotBlank
    private List<CartItemModel> items;
}
