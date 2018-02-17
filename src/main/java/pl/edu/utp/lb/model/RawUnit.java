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
public class RawUnit {

    private Long cellId;
    private String cellName;
    private Long overridingCellId;
    private String overridingCellName;
}