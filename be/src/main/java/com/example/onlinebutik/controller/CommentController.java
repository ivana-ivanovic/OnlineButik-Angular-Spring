package com.example.onlinebutik.controller;

import com.example.onlinebutik.entity.Comment;
import com.example.onlinebutik.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("findallbyiditem")
    @CrossOrigin("*")
    public List<Comment> findAllByIdItem(String idItem){
        return this.commentService.findAllByIdItem(idItem);
    }

    @PostMapping("insert")
    @CrossOrigin("*")
    public Comment insert(@RequestBody Comment comment){
        return this.commentService.insert(comment);
    }

    @GetMapping("countstars")
    @CrossOrigin("*")
    public Double countStars(String idItem){
        return this.commentService.countStars(idItem);
    }
}
