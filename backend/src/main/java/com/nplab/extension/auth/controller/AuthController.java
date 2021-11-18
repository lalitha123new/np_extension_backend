package com.nplab.extension.auth.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.nplab.extension.auth.CustomUserDetailsService;
import com.nplab.extension.auth.JwtRequest;
import com.nplab.extension.auth.JwtResponse;
import com.nplab.extension.auth.JwtUtil;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping(path = "/authenticate")
public class AuthController {
	
	private static ArrayList<String> expiredTokens = new ArrayList<>();
	
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping(path = "/login")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) throws Exception {
    	authenticate(authRequest.getUsername(), authRequest.getPassword());
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @PostMapping(path = "/logout")
    public String logout(@RequestHeader(name = "Authorization") String token) {
    	return null;
    }
    
    @GetMapping(path = "/me")
    public String getUsername(@RequestHeader(name = "Authorization") String token) {
    	token = token.substring(7);
    	return jwtUtil.getUsernameFromToken(token);
    }

    private void authenticate(String username, String password) throws Exception {
    	try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
