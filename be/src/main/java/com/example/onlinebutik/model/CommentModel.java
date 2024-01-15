package com.example.onlinebutik.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentModel {

    private String id;
    private String comment;
    private Date date;
    private Integer stars;
    private String idItem;
    private String userEmail;
}
