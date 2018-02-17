package pl.edu.utp.lb.exception;

/**
 *
 * @author Artur Mokosa
 */
public class BackendException extends Exception {

    protected String userMessage;

    public BackendException() {
        
    }

    public BackendException(String userMessage) {
        
        this.userMessage = userMessage;
    }

    public String getUserMessage() {
        
        return userMessage;
    }

    public void setUserMessage(String userMessage) {
        
        this.userMessage = userMessage;
    }
}