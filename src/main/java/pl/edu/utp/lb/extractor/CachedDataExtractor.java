package pl.edu.utp.lb.extractor;

import java.util.Arrays;
import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import pl.edu.utp.lb.exception.ExtractionException;
import pl.edu.utp.lb.exception.ExtractionFailedException;
import pl.edu.utp.lb.model.RawEmployee;
import pl.edu.utp.lb.model.RawRoom;
import pl.edu.utp.lb.model.RawSystem;
import pl.edu.utp.lb.model.RawUnit;

/**
 *
 * @author Artur Mokosa
 */
@Component
@EnableCaching
public class CachedDataExtractor implements DataExtractor {

    @Override
    @Cacheable("raw-units")
    public List<RawUnit> getUnits() throws ExtractionException {

        RawUnit[] units = extractUnits();
        outputCheck(units);

        return Arrays.asList(units);
    }

    @Override
    @Cacheable("raw-rooms")
    public List<RawRoom> getRooms() throws ExtractionException {

        RawRoom[] rooms = extractRooms();
        outputCheck(rooms);

        return Arrays.asList(rooms);
    }

    @Override
    @Cacheable("raw-employees")
    public List<RawEmployee> getEmployees() throws ExtractionException {

        RawEmployee[] employees = extractEmployees();
        outputCheck(employees);

        return Arrays.asList(employees);
    }

    @Override
    @Cacheable("raw-systems")
    public List<RawSystem> getSystems() throws ExtractionException {

        RawSystem[] items = extractSystems();
        outputCheck(items);

        return Arrays.asList(items);
    }

    private RawUnit[] extractUnits() {

        System.out.println("call: extract units"); //Logger here

        ResponseEntity<RawUnit[]> response
                = new RestTemplate().getForEntity("http://212.122.192.216:8097/api/v1/cell/all",
                        RawUnit[].class);

        return response.getBody();
    }

    private RawRoom[] extractRooms() {

        System.out.println("call: extract rooms"); //Logger here

        ResponseEntity<RawRoom[]> response
                = new RestTemplate().getForEntity("http://212.122.192.216:8097/api/v1/room/all",
                        RawRoom[].class);

        return response.getBody();
    }

    private RawEmployee[] extractEmployees() {

        System.out.println("call: extract employees"); //Logger here

        ResponseEntity<RawEmployee[]> response
                = new RestTemplate().getForEntity("http://212.122.192.216:8097/api/v1/employee/all",
                        RawEmployee[].class);

        return response.getBody();
    }

    private RawSystem[] extractSystems() {

        System.out.println("call: extract systems"); //Logger here

        ResponseEntity<RawSystem[]> response
                = new RestTemplate().getForEntity("http://212.122.192.216:8097/api/v1/itsystem/all",
                        RawSystem[].class);

        return response.getBody();
    }

    private void outputCheck(Object[] array) throws ExtractionException {

        if (array == null || array.length == 0) {

            throw new ExtractionFailedException("Data extraction from server failed.");
        }
    }
}
