package com.nplab.extension.auth;

import java.io.Serializable;

public class JwtResponse implements Serializable {
    private static final long serialVersionUID = 5926468583005150707L;
    private String jwtoken;

    public JwtResponse(String jwtoken) {
        this.jwtoken = jwtoken;
    }

    public String getJwtoken() {
        return jwtoken;
    }
}
