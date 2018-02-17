package pl.edu.utp.lb.exception;

/**
 *
 * @author Artur Mokosa
 */
public class ExtractionFailedException extends ExtractionException {

    public ExtractionFailedException() {
        
    }

    public ExtractionFailedException(String userMessage) {
        super(userMessage);
    }
}
