package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Comment;

import java.util.List;

public interface ICommentService {
    List<Comment> findAllByIdItem(String idItem);
    Comment insert(Comment comment);
    Double countStars(String idItem);

}
