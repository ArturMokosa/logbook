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
public class RawSystem {

    private String id;
    private String name;
    private String description;
    private Long administratorId;
    private String administratorName;
}
