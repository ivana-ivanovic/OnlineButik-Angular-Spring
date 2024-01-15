package com.example.onlinebutik.service;

import com.example.onlinebutik.entity.Comment;
import com.example.onlinebutik.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService implements ICommentService{

    @Autowired
    ICommentRepository commentRepository;


    @Override
    public List<Comment> findAllByIdItem(String idItem) {
        return this.commentRepository.findAllByIdItem(idItem);
    }

    @Override
    public Comment insert(Comment comment) {
        return this.commentRepository.insert(comment);
    }

    @Override
    public Double countStars(String idItem) {
        List<Comment> list = this.commentRepository.findAllByIdItem(idItem);
        Double starsSum = 0.0;
        for (Comment comment : list) {
            starsSum += comment.getStars();
        }
        return  starsSum / list.size();
    }


}
