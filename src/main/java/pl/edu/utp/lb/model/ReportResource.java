package pl.edu.utp.lb.model;

import java.sql.Timestamp;
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
public class ReportResource {

    private String systemId;
    private long applicantId;
    
    private Event.Type eventType;
    private String occuredAt;
    
    private AnnotationResource annotation;
}
