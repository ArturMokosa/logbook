package pl.edu.utp.lb.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.utp.lb.exception.ExtractionException;
import pl.edu.utp.lb.exception.ExtractionFailedException;
import pl.edu.utp.lb.exception.LowAccessException;
import pl.edu.utp.lb.extractor.DataExtractor;
import pl.edu.utp.lb.model.RawEmployee;
import pl.edu.utp.lb.model.RawRoom;
import pl.edu.utp.lb.model.RawSystem;
import pl.edu.utp.lb.model.RawUnit;

/**
 *
 * @author Artur Mokosa
 */
@Component
public class ResourceFactory {

    private final DataExtractor extractor;

    @Autowired
    public ResourceFactory(DataExtractor extractor) {

        this.extractor = extractor;
    }

    /* Units */
    public RawUnit getUnitById(long id) throws ExtractionException {

        RawUnit unit = extractor.getUnits().stream().filter(
                u -> u.getCellId() == id).findAny().orElseThrow(
                        () -> new ExtractionFailedException("Unit with id: " + id + " not found."));

        return unit;
    }

    public List<RawUnit> getUnits() throws ExtractionException {

        return extractor.getUnits();
    }

    /* Rooms */
    public RawRoom getRoomById(String id) throws ExtractionException {

        RawRoom room = extractor.getRooms().stream().filter(
                p -> p.getRoomId().equals(id)).findAny().orElseThrow(
                        () -> new ExtractionFailedException("Room with id: " + id + " not found."));

        return room;
    }

    public List<RawRoom> getRooms() throws ExtractionException {

        return extractor.getRooms();
    }

    /* Employees */
    public RawEmployee getEmployeeById(long id) throws ExtractionException {

        RawEmployee employee = extractor.getEmployees().stream().filter(
                p -> p.getEmployeeId().equals(id)).findAny().orElseThrow(
                        () -> new ExtractionFailedException("Employee with id: " + id + " not found."));

        return employee;
    }

    public RawEmployee getEmployeeByEmail(String email) throws ExtractionException {

        RawEmployee employee = extractor.getEmployees().stream().filter(
                p -> p.getEmail().equals(email)).findAny().orElseThrow(
                        () -> new ExtractionFailedException("Employee with email: " + email + " not found."));

        return employee;
    }

    public List<RawEmployee> getEmployeesWithAsi() throws ExtractionException {

        List<RawEmployee> employees = new ArrayList<>();

        extractor.getEmployees().stream().forEach(
                a -> {
                    if (a.getIsAsi()) {
                        employees.add(a);
                    }
                });

        if (employees.isEmpty()) {

            throw new ExtractionFailedException("No employee with ASI found..");
        }

        return employees;
    }

    public RawEmployee getAsiEmployeeByEmail(String email) throws ExtractionException, LowAccessException {

        RawEmployee employee = extractor.getEmployees().stream().filter(
                p -> p.getEmail().equals(email)).findAny().orElseThrow(
                        () -> new ExtractionFailedException("Employee with email: " + email + " not found."));
        
        if (employee.getIsAsi()) {
            return employee;
        } 
        
        throw new LowAccessException("Employee with email: " + email + " is not an ASI.");
    }

    public List<RawEmployee> getEmployees() throws ExtractionException {

        return extractor.getEmployees();
    }

    /* Systems */
    public RawSystem getSystemById(String id) throws ExtractionException {

        RawSystem system = extractor.getSystems().stream().filter(
                p -> p.getId().equals(id)).findAny().orElseThrow(
                        () -> new ExtractionFailedException("System with id: " + id + " not found."));

        return system;
    }

    public List<RawSystem> getSystemsByAdministrator(long id) throws ExtractionException {

        List<RawSystem> systems = new ArrayList<>();

        extractor.getSystems().stream().forEach(
                a -> {
                    if (a.getAdministratorId() == null) {
                        return;
                    }
                    if (a.getAdministratorId().equals(id)) {
                        systems.add(a);
                    }
                });

        if (systems.isEmpty()) {

            throw new ExtractionFailedException("Employee with id: " + id + " does not have any related systems.");
        }

        return systems;
    }

    public List<RawSystem> getSystems() throws ExtractionException {

        return extractor.getSystems();
    }
}
