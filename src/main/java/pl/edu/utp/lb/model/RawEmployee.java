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
public class RawEmployee {

    private String login;
    private String name;
    private String degree;
    private Long employeeId;
    private String workplace;
    private String function;
    private String email;
    private String departmentName;
    private Long cellId;
    private String cellName;
    private Boolean isManager;
    private String roomId;
    private Boolean isAsi;
}