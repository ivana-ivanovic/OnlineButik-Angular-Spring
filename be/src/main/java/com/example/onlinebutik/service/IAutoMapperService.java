package com.example.onlinebutik.service;

public interface IAutoMapperService {
    <T> T map(Object model, Class<T> entity);
}
