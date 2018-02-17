package pl.edu.utp.lb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Artur Mokosa
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnnotationResource {

    private long applicantId;
    
    private String eventDetails;
}
