package com.example.onlinebutik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersModel {

    private String id;
    private String name;
    private String surname;
    private String address;
    private String city;
    private String email;
    private String nickName;
    private String picture;
    private LocalDate date;
    private String phoneNumber;
    private List<String> favouriteItems;

}
