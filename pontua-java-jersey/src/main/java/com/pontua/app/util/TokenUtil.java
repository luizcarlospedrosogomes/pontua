/**
 * Created by Philip A Senger on November 10, 2015
 */
package com.pontua.app.util;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.MacProvider;

public class TokenUtil {

    public static String getJWTString(String username, String roles, int version, Date expires) {
        // Issue a token (can be a random String persisted to a database or a JWT token)
        // The issued token must be associated to a user
        // Return the issued token
        if (username == null) {
        	System.out.println("username null");
            throw new NullPointerException("null username is illegal");
        }
        if (roles == null) {
        	System.out.println("roles null");
        	throw new NullPointerException("null roles are illegal");
        }
        if (expires == null) {
        	System.out.println("expires null");
            throw new NullPointerException("null expires is illegal");
        }
   
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key key = MacProvider.generateKey();
                
        String jwtString = Jwts
                .builder()
                .setIssuer("Jersey-Security-Basic")
                .setSubject(username)
                .setAudience(StringUtils.join(Arrays.asList(roles), ","))
                .setExpiration(expires)
                .setIssuedAt(new Date())
                .setId(String.valueOf(version))
                .signWith(signatureAlgorithm, key)
                .compact();
        
        return jwtString;
    }

    public static boolean isValid(String token, Key key) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token.trim());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static String getName(String jwsToken, Key key) {
        if (isValid(jwsToken, key)) {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwsToken);
            return claimsJws.getBody().getSubject();
        }
        return null;
    }

    public static String[] getRoles(String jwsToken, Key key) {
        if (isValid(jwsToken, key)) {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwsToken);
            return claimsJws.getBody().getAudience().split(",");
        }
        return new String[]{};
    }

 /*   public static int getVersion(String jwsToken, Key key) {
        if (isValid(jwsToken, key)) {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwsToken);
            return Integer.parseInt(claimsJws.getBody().getId());
        }
        return -1;
    }*/

}
