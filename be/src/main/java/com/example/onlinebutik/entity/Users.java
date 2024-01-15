package com.example.onlinebutik.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;


@Data
@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    private String id;
    @Field("name")
    @NotBlank
    private String name;
    @Field("surname")
    @NotBlank
    private String surname;
    @Field("address")
    @NotBlank
    private String address;
    @Field("city")
    @NotBlank
    private String city;
    @Field("email")
    @NotBlank
    @Email
    private String email;
    @Field("nick_name")
    @NotBlank
    private String nickName;
    @Field("picture")
    @NotBlank
    private String picture;
    @Field("date")
    private LocalDate date;
    @Field("phone_number")
    @NotBlank
    private String phoneNumber;
    @Field("favourite_items")
    private List<String> favouriteItems;

}
