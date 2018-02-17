package pl.edu.utp.lb.provider;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pl.edu.utp.lb.exception.BackendException;
import pl.edu.utp.lb.exception.LowAccessException;
import pl.edu.utp.lb.model.ErrorInfo;

/**
 *
 * @author Artur Mokosa
 */
@ControllerAdvice
public class RestExceptionInterceptor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(
            value = {
                BackendException.class})
    protected ResponseEntity<Object> intercept(BackendException ex, WebRequest request) {

        if (ex instanceof LowAccessException) {
            ErrorInfo body = new ErrorInfo(403, ex.getUserMessage());
            
            return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
        }

        ErrorInfo body = new ErrorInfo(404, ex.getUserMessage());

        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
