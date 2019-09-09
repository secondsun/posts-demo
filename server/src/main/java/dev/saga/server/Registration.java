package dev.saga.server;

public class Registration {
    public String auth, token, endpoint;

    /**
     * @return the auth
     */
    public String getAuth() {
        return auth;
    }
    /**
     * @return the endpoint
     */
    public String getEndpoint() {
        return endpoint;
    }
    /**
     * @return the token
     */
    public String getToken() {
        return token;
    }
    /**
     * @param auth the auth to set
     */
    public void setAuth(String auth) {
        this.auth = auth;
    }/**
     * @param endpoint the endpoint to set
     */
    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }/**
     * @param token the token to set
     */
    public void setToken(String token) {
        this.token = token;
    }

}