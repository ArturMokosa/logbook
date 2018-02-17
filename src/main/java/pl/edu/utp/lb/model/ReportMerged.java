package pl.edu.utp.lb.model;

import java.sql.Timestamp;
import java.util.List;
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
public class ReportMerged {

    private String id;
    private String systemName;
    private String applicantName;

    private Event.Type eventType;
    private String occuredAt;
    private String createdAt;

    private List<AnnotationMerged> annotations;
}
