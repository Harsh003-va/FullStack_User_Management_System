package com.User.User.controller;

import com.User.User.dto.TodoDto;
import com.User.User.model.UserEntity;
import com.User.User.pojo.Todo;
import com.User.User.pojo.TodoDeleteResponse;
import com.User.User.repository.UserRepository;
import com.User.User.service.TodoService;
import com.User.User.modelMapper.ModelMapperSingleton;
import com.User.User.pojo.TodoRequestModel;
import com.User.User.pojo.TodoResponse;
import com.User.User.service.TodoServiceImpl;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todo")
public class TodoController {
    @Autowired
    private TodoServiceImpl todoService;

    @Autowired
    private UserRepository userRepository;




    @PreAuthorize("hasAnyRole('ADMIN','USER')")
//    @PostAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/addTodo")
    public ResponseEntity<TodoResponse> createTodo(@Validated @RequestBody TodoRequestModel todoRequestModel) {
        ModelMapper mapper = ModelMapperSingleton.getInstance();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TodoDto todoDto = mapper.map(todoRequestModel, TodoDto.class);
        todoService.createTodo(todoDto);
        TodoResponse response = mapper.map(todoDto, TodoResponse.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }


    @GetMapping("/getAllTodo/{userId}")
    public ResponseEntity<List<TodoDto>> getAllTodo(@PathVariable Long userId) {
    Optional<UserEntity> userEntity = userRepository.findById(userId);
        if (userEntity==null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(todoService.getAllTodo(userEntity.get().getId()));
    }

   // @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/delete/{todoId}")
    public ResponseEntity<TodoDeleteResponse> deleteTodoById(@PathVariable String todoId) {
        TodoDto todoDto = todoService.deleteTodoById(todoId);
        TodoDeleteResponse response = ModelMapperSingleton.getInstance().map(todoDto, TodoDeleteResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PutMapping("/update/{todoId}")
    public ResponseEntity<TodoResponse> updateTodo(@PathVariable String todoId, @Validated @RequestBody TodoRequestModel todoRequestModel) {
        ModelMapper mapper = ModelMapperSingleton.getInstance();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        TodoDto todoDto = mapper.map(todoRequestModel, TodoDto.class);

        TodoDto updatedDto = todoService.updateTodo(todoId, todoDto);

        TodoResponse response = mapper.map(updatedDto, TodoResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/getTodo/{todoId}")
    public ResponseEntity<TodoResponse> getTodoById(@PathVariable String todoId) {
        ModelMapper mapper = ModelMapperSingleton.getInstance();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        TodoDto todoDto = todoService.getTodoById(todoId);
        TodoResponse res = mapper.map(todoDto, TodoResponse.class);

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }
}
