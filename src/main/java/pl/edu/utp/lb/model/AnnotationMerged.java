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
public class AnnotationMerged {

    private String applicantName;
    private String createdAt;
    private String eventDetails;
}
