package dev.saga.server;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/push")
public class RegisterPush {
    


    private String endpoint;
    private String auth;
    private String token;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Registration hello(Registration reg) {
        this.token = reg.token;
        this.auth = reg.auth;
        this.endpoint = reg.endpoint;
        return reg;
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String sendMessage() {
        return "fail";
    }
    
}
