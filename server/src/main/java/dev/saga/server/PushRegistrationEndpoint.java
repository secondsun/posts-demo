package dev.saga.server;

import javax.ws.rs.Produces;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.security.Security;
import java.util.stream.Collectors;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.apache.http.HttpResponse;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;

@Path("/push")
public class PushRegistrationEndpoint {

    static {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
    }

    private static String PUBLIC_KEY = "BIk8YK3iWC3BfMt3GLEghzY4v5GwaZsTWKxDKm-FZry3Nx2E_q-4VW3501DkQ5TX1Pe7c3yIsajUk9hQAo3sT-0";
    private static String PRIVATE_KEY = "FTg6q0-BXP6m-i6cNpg8P6JKccCUwWaD4yuirotxqXo";

    private static PushRegistration registration = null;

    @PUT
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public PushRegistration register(PushRegistration registration) {
        System.out.println("Registering " + registration.getEndpoint());
        PushRegistrationEndpoint.registration = registration;
        return registration;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public PushRegistration sendMessage(String message) {
        System.out.println("Registering " + registration.getEndpoint());

        // Figure out if we should use GCM for this notification somehow
        Notification notification;
        PushService pushService;
        byte[] payload = "Hello Push!".getBytes();
        // Create a notification with the endpoint, userPublicKey from the subscription
        // and a custom payload
        try {
            notification = new Notification(registration.getEndpoint(), registration.getUserPublicKey(),
                    registration.getAuthAsBytes(), payload);
            pushService = new PushService();
            pushService.setPublicKey(PUBLIC_KEY);
            pushService.setPrivateKey(PRIVATE_KEY);
            HttpResponse result = pushService.send(notification);
            System.out.println(result.getStatusLine().getReasonPhrase());
            try (BufferedReader br = new BufferedReader(new InputStreamReader(result.getEntity().getContent(), Charset.defaultCharset()))) {
                System.out.println( br.lines().collect(Collectors.joining(System.lineSeparator())));
            }
            
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }

            // Instantiate the push service, no need to use an API key for Push API

        return registration;

    }

}