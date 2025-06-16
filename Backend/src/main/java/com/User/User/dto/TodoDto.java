package com.User.User.dto;



import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Data
public class TodoDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 42L;

    private long id;

    private String todoId;
    private String name;
    private String description;
    private double price;
    private Date manufactureTime;
    private Date expTime;
}
