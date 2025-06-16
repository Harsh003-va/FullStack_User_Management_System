package com.User.User.service;

import com.User.User.dto.TodoDto;
import com.User.User.pojo.Todo;

import java.util.List;

public interface TodoService {
    public List<TodoDto> getAllTodo(Long UserID);
    public TodoDto createTodo(TodoDto todoDto);
    public TodoDto updateTodo(String todoId, TodoDto todo);
    public TodoDto deleteTodoById(String todoId);


}
