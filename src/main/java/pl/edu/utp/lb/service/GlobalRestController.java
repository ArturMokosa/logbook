package pl.edu.utp.lb.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.utp.lb.exception.ExtractionException;
import pl.edu.utp.lb.model.AnnotationResource;
import pl.edu.utp.lb.model.ErrorInfo;
import pl.edu.utp.lb.model.Event;
import pl.edu.utp.lb.model.RawEmployee;
import pl.edu.utp.lb.model.RawSystem;
import pl.edu.utp.lb.model.ReportMerged;
import pl.edu.utp.lb.model.ReportResource;

/**
 *
 * @author Artur Mokosa
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GlobalRestController {

    private final DataService data;
    private final ResourceFactory resources;

    @Autowired
    public GlobalRestController(DataService data, ResourceFactory factory) {

        this.data = data;
        this.resources = factory;
    }

    // POST: api/reports
    @RequestMapping(
            method = RequestMethod.POST,
            value = "/reports")
    public ResponseEntity<Object> postReport(
            @RequestBody final ReportResource resource)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        if (data.postReport(resource)) {
            return new ResponseEntity<>("Report created.", HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("Operation failed.", HttpStatus.BAD_REQUEST);
        }
    }

    // PATCH: api/reports/{id}
    @RequestMapping(
            method = RequestMethod.PATCH,
            value = "/reports/{id}")
    public ResponseEntity<Object> patchReport(
            @PathVariable(name = "id", required = true) final long id,
            @RequestBody final AnnotationResource resource)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        if (data.patchReport(id, resource)) {
            return new ResponseEntity<>("Report updated.", HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("Operation failed.", HttpStatus.BAD_REQUEST);
        }
    }

    // GET: api/reports/{id}
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/reports/{id}")
    public ResponseEntity<Object> getReport(
            @PathVariable(name = "id", required = true) final long id)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        ReportMerged report = data.getReport(id);

        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    // GET: api/reports
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/reports")
    public ResponseEntity<Object> getReports(
            @RequestParam(name = "applicant", required = false) final Long applicant,
            @RequestParam(name = "type", required = false) final Event.Type type)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        List<ReportMerged> reports = data.getReports(applicant, type);

        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // GET: api/login
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/login")
    public ResponseEntity<RawEmployee> login(
            @RequestHeader("email") final String email)
            throws Exception {

        RawEmployee employee = resources.getAsiEmployeeByEmail(email);

        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // GET: api/systems/{id}
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/systems/{id}")
    public ResponseEntity<Object> getSystem(
            @PathVariable(name = "id", required = true) final String id)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        RawSystem system = resources.getSystemById(id);

        return new ResponseEntity<>(system, HttpStatus.OK);
    }

    // GET: api/systems
    @RequestMapping(
            method = RequestMethod.GET,
            value = "/systems")
    public ResponseEntity<Object> getSystems(
            @RequestParam(name = "applicant", required = false) final Long applicant)
            //throws DatabaseException, ExtractionException {
            throws Exception {

        List<RawSystem> systems;

        if (applicant != null) {
            systems = resources.getSystemsByAdministrator(applicant);
        } else {
            systems = resources.getSystems();
        }

        return new ResponseEntity<>(systems, HttpStatus.OK);
    }
}
