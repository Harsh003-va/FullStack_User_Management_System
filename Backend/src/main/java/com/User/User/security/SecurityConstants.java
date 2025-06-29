package com.User.User.security;

import com.User.User.SpringApplicationContext;

import javax.swing.*;

public class SecurityConstants {
    public static final String HEADER_STRING = "Authorization";
    public static final String USER_ID = "user_Id";
    public static final String TOKEN_PREFIX = "Bearer ";

    public static String getSecretToken() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getTokenSecret();
    }

    public static String getTokenExpirationTime() {
        AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
        return appProperties.getTokenExpirationTime();
    }
}
