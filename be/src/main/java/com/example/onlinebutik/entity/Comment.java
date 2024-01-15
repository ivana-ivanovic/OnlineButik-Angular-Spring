package com.example.onlinebutik.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Document(collection = "comments")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    private String id;
    @Field("comment")
    @NotBlank
    private String comment;
    @Field("date")
    @NotBlank
    private Date date;
    @Field("stars")
    @NotBlank
    private Integer stars;
    @Field("id_item")
    @NotBlank
    private String idItem;
    @Field("user_email")
    @NotBlank
    private String userEmail;
}
