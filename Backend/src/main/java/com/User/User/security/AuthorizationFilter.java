package com.User.User.security;

import com.User.User.SpringApplicationContext;
import com.User.User.model.UserDto;
import com.User.User.model.UserEntity;
import com.User.User.repository.UserRepository;
import com.User.User.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class AuthorizationFilter extends BasicAuthenticationFilter {

    UserRepository userRepository;

    public AuthorizationFilter(AuthenticationManager authenticationManager,  UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository=userRepository;

    }


    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String authorizationHeader = req.getHeader(SecurityConstants.HEADER_STRING);
        if (authorizationHeader == null ||
                !authorizationHeader.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }
        authorizationHeader = authorizationHeader.replace(SecurityConstants.TOKEN_PREFIX, "").trim();
        UsernamePasswordAuthenticationToken authorization = getAuthentication(authorizationHeader);
        SecurityContextHolder.getContext().setAuthentication(authorization);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        String commonKey = SecurityConstants.getSecretToken();
        if (commonKey == null) return null;
        SecretKey key = Keys.hmacShaKeyFor(commonKey.getBytes());

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String email = claims.getSubject();



        if (email != null) {

            UserEntity entity=userRepository.findByUserId(email);
            UserPrincipal userPrincipal=new UserPrincipal(entity);
            return new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        } return null;
    }

}
