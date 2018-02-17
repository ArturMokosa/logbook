package pl.edu.utp.lb.extractor;

import java.util.List;
import pl.edu.utp.lb.exception.ExtractionException;
import pl.edu.utp.lb.model.RawEmployee;
import pl.edu.utp.lb.model.RawRoom;
import pl.edu.utp.lb.model.RawSystem;
import pl.edu.utp.lb.model.RawUnit;

/**
 *
 * @author Artur Mokosa
 */
public interface DataExtractor {
    
    // Organization Units
    public List<RawUnit> getUnits() throws ExtractionException;
    
    // Rooms 
    public List<RawRoom> getRooms() throws ExtractionException;

    // Employees
    public List<RawEmployee> getEmployees() throws ExtractionException;
    
    // Systems
    public List<RawSystem> getSystems() throws ExtractionException;
}
