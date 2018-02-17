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
public class RawRoom {

    private String roomId;
    private String campus;
    private String building;
    private String roomName;
    private String roomType;
    private Long cellId;
    private String cellName;
}