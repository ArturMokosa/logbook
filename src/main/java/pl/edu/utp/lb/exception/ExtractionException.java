package pl.edu.utp.lb.exception;

/**
 *
 * @author Artur Mokosa
 */
public abstract class ExtractionException extends BackendException {

    public ExtractionException() {
        
    }

    public ExtractionException(String userMessage) {
        super(userMessage);
    }
}
