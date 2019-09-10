package dev.saga.server;

public class PushKey {
    private String p256dh = "";
    private String auth = "";

    /**
     * @return the auth
     */
    public String getAuth() {
        return auth;
    }

    /**
     * @return the p256dh
     */
    public String getP256dh() {
        return p256dh;
    }

    /**
     * @param auth the auth to set
     */
    public void setAuth(String auth) {
        this.auth = auth;
    }

    /**
     * @param p256dh the p256dh to set
     */
    public void setP256dh(String p256dh) {
        this.p256dh = p256dh;
    }

}
