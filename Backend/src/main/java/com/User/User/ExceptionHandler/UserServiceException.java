package com.User.User.ExceptionHandler;

import java.io.Serial;

public class UserServiceException extends RuntimeException{
    @Serial
    private static final long serialVersionUID = -1750536184496748811L;

    public UserServiceException(String message) {
        super(message);
    }
}
