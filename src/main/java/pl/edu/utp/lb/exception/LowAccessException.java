package pl.edu.utp.lb.exception;

/**
 *
 * @author Artur Mokosa
 */
public class LowAccessException extends BackendException {

    public LowAccessException() {
        
    }

    public LowAccessException(String userMessage) {
        super(userMessage);
    }
}
