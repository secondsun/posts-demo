package dev.saga.server;

import java.beans.Transient;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import javax.json.bind.annotation.JsonbTransient;

import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.bouncycastle.math.ec.ECPoint;

public class PushRegistration {
    private String endpoint ="";
    private PushKey keys = null;

    @JsonbTransient
    public byte[] getAuthAsBytes() {
        return Base64.getDecoder().decode(keys.getAuth());
    }

    @JsonbTransient
    public byte[] getKeyAsBytes() {
        return Base64.getDecoder().decode(keys.getP256dh());
    }

    /**
     * Returns the base64 encoded public key as a PublicKey object
     */
    @JsonbTransient
    public PublicKey getUserPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchProviderException {
        KeyFactory kf = KeyFactory.getInstance("ECDH", BouncyCastleProvider.PROVIDER_NAME);
        ECNamedCurveParameterSpec ecSpec = ECNamedCurveTable.getParameterSpec("secp256r1");
        System.out.println(keys.getP256dh());
        System.out.println(getKeyAsBytes().length);
        ECPoint point = ecSpec.getCurve().decodePoint(getKeyAsBytes());
        ECPublicKeySpec pubSpec = new ECPublicKeySpec(point, ecSpec);

        return kf.generatePublic(pubSpec);
    }

    /**
     * @param endpoint the endpoint to set
     */
    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    /**
     * @param keys the keys to set
     */
    public void setKeys(PushKey keys) {
        this.keys = keys;
    }

    /**
     * @return the endpoint
     */
    public String getEndpoint() {
        return endpoint;
    }
    /**
     * @return the keys
     */
    public PushKey getKeys() {
        return keys;
    }

}