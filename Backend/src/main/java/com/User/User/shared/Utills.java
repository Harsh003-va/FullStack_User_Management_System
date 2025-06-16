package com.User.User.shared;


import com.User.User.security.SecurityConstants;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Date;
import java.util.Random;

@Component
public class Utills {
    private final Random RANDOM = new SecureRandom();
    private final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$#&^*@!+-";

    public String generateUserId(int length) {
        return generateRandomUserId(length);
    }

    private String generateRandomUserId(int length) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }

    public String generateToken(String userId) {
        String commonKey = SecurityConstants.getSecretToken();
        //SHA, HS-52 - encryption algorithms
        SecretKey secretKey = Keys.hmacShaKeyFor(commonKey.getBytes());
        return Jwts.builder()
                .subject(userId)
                .expiration(Date.from(Instant.now().plusMillis(Long.parseLong(SecurityConstants.getTokenExpirationTime()))))
                .issuedAt(Date.from(Instant.now()))
                .signWith(secretKey)
                .compact(); //build the token
    }
    public static boolean hasTokenExpired(String token) {
        boolean returnValue = false;
        try {
            String commonKey = SecurityConstants.getSecretToken();
            if (commonKey == null)
                return true;

            SecretKey key = Keys.hmacShaKeyFor(commonKey.getBytes());

            Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();

            Date tokenExpirationTime = claims.getExpiration();
            Date todayDate = new Date();
            returnValue = tokenExpirationTime.before(todayDate);
        } catch (ExpiredJwtException ext) {
            returnValue = true;
        }

        return returnValue;
    }
}
