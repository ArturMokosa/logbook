package pl.edu.utp.lb.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Artur Mokosa
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorInfo {

    private int errorCode;
    private String userMessage;
}
