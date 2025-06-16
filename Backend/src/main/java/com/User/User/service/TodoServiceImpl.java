package com.User.User.service;

import com.User.User.model.UserEntity;
import com.User.User.pojo.Todo;
import com.User.User.repository.UserRepository;
import com.User.User.service.TodoService;
import com.User.User.repository.TodoRepository;
import com.User.User.modelMapper.ModelMapperSingleton;
import com.User.User.dto.TodoDto;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Optional;
@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TodoRepository todoRepository;

    private UserEntity getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username);

    }

    public TodoDto getTodoById(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(username);

        Optional<Todo> todo = todoRepository.findByTodoIdAndUser(id, currentUser);
        if(todo.isEmpty()) {
            throw new RuntimeException("Todo not found or doesn't belong to the user");
        }
        return ModelMapperSingleton.getInstance().map(todo, TodoDto.class);
    }










    @Override
    public List<TodoDto> getAllTodo(Long userId) {
        ModelMapper mapper = ModelMapperSingleton.getInstance();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        List<Todo> todos = todoRepository.findByUser_Id(userId);
        return todos.stream().map(todo ->
                mapper.map(todo, TodoDto.class)).collect(Collectors.toList());
    }

    @Override
    public TodoDto createTodo(TodoDto todoDto) {

        todoDto.setTodoId(UUID.randomUUID().toString());
        ModelMapper mapper = ModelMapperSingleton.getInstance();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Todo todo=mapper.map(todoDto,Todo.class);
        todo.setUser(getCurrentUser());
        todoRepository.save(todo);

        TodoDto returnDto=mapper.map(todo,TodoDto.class);
        return  returnDto;

    }

    @Override
    public TodoDto updateTodo(String todoId, TodoDto todo) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(username);

        Todo temp_todo = todoRepository.findByTodoId(todoId);
        if(temp_todo==null || !temp_todo.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Todo not found or doesn't belong to the user");
        }

        temp_todo.setName(todo.getName());
        temp_todo.setDescription(todo.getDescription());
        temp_todo.setPrice(todo.getPrice());
        temp_todo.setManufactureTime(todo.getManufactureTime());
        temp_todo.setExpTime(todo.getExpTime());
        todoRepository.save(temp_todo);

        return ModelMapperSingleton.getInstance().map(temp_todo, TodoDto.class);
    }

    @Transactional
    @Override
    public TodoDto deleteTodoById(String todoId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserEntity currentUser = userRepository.findByEmail(username);

        Todo todo = todoRepository.findByTodoId(todoId);
        if(todo == null || !todo.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Todo not found or doesn't belong to the user");
        }

        todoRepository.delete(todo);
        return ModelMapperSingleton.getInstance().map(todo, TodoDto.class);
    }
}
