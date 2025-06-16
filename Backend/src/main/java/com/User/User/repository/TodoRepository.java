package com.User.User.repository;

import com.User.User.model.UserEntity;
import com.User.User.pojo.Todo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends CrudRepository<Todo, Long> {
    Todo findByTodoId(String todoId);
    Optional<Todo> findByTodoIdAndUser(String todoId, UserEntity user);  // New method
    List<Todo> findByUser(UserEntity user);
    List<Todo> findByUser_Id(Long userId);
}
