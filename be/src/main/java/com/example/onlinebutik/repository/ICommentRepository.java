package com.example.onlinebutik.repository;

import com.example.onlinebutik.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ICommentRepository  extends MongoRepository<Comment, String> {
    List<Comment> findAllByIdItem(String idItem);

}
