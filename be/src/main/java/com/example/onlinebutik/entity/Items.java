package com.example.onlinebutik.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
@Document(collection = "items")
@NoArgsConstructor
@AllArgsConstructor
public class Items {

    @Id
    private String id;
    @Field("name")
    @NotBlank
    private String name;
    @Field("image")
    @NotBlank
    private String image;
    @Field("category")
    @NotBlank
    private String category;
    @Field("type")
    @NotBlank
    private String type;
    @Field("amount")
    @NotBlank
    private List<Size> amount;
    @Field("stars")
    private Double stars;
    @Field("price")
    @NotBlank
    private Double price;
    @Field("description")
    @NotBlank
    private String description;
    @Field("country")
    @NotBlank
    private String country;
    @Field("slug")
    private String slug;

}
