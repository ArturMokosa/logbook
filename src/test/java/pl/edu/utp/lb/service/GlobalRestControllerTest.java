package pl.edu.utp.lb.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import static org.mockito.Mockito.when;
import org.springframework.http.HttpStatus;
import pl.edu.utp.lb.model.AnnotationResource;
import pl.edu.utp.lb.model.Event;
import pl.edu.utp.lb.model.ReportMerged;
import pl.edu.utp.lb.model.ReportResource;

/**
 *
 * @author Artur Mokosa
 */
//@RunWith(MockitoJUnitRunner.class)
//public class GlobalRestControllerTest {

//    @Mock
//    private DataService data;
//
//    @Mock
//    private ResourceFactory resource;
//
//    @InjectMocks
//    private GlobalRestController controller;
//
//    @Test
//    public void postReportAcceptedTest() throws Exception {
//
//        ReportResource report = new ReportResource(
//                "0621", 165153L, Event.Type.RESTART,
//                new Timestamp(3215315616L),
//                new AnnotationResource(
//                        165153L, "Standard system restart."));
//
//        when(data.postReport(report)).thenReturn(true);
//
//        assertEquals(HttpStatus.ACCEPTED, controller.postReport(report).getStatusCode());
//    }
//
//    @Test
//    public void postReportBadRequestTest() throws Exception {
//
//        ReportResource report = new ReportResource(
//                "0621", 165153L, Event.Type.RESTART,
//                new Timestamp(3215315616L),
//                new AnnotationResource(
//                        165153L, "Standard system restart."));
//
//        when(data.postReport(report)).thenReturn(false);
//
//        assertEquals(HttpStatus.BAD_REQUEST, controller.postReport(report).getStatusCode());
//    }
//
//    @Test
//    public void patchReportAcceptedTest() throws Exception {
//
//        AnnotationResource annotation = new AnnotationResource(
//                62114L, "Restart completed");
//
//        when(data.patchReport(561651L, annotation)).thenReturn(true);
//
//        assertEquals(HttpStatus.ACCEPTED, controller.patchReport(561651L, annotation).getStatusCode());
//    }
//
//    @Test
//    public void patchReportBadRequestTest() throws Exception {
//
//        AnnotationResource annotation = new AnnotationResource(
//                62114L, "Restart completed");
//
//        when(data.patchReport(561651L, annotation)).thenReturn(false);
//
//        assertEquals(HttpStatus.BAD_REQUEST, controller.patchReport(561651L, annotation).getStatusCode());
//    }
//
//    @Test
//    public void getReportOkTest() throws Exception {
//
//        ReportMerged report = new ReportMerged();
//
//        when(data.getReport(265L)).thenReturn(report);
//
//        assertEquals(HttpStatus.OK, controller.getReport(265L).getStatusCode());
//    }

//    @Test
//    public void getReportsOkTest() throws Exception {
//
//        List<ReportMerged> reports = new ArrayList<>();
//
//        when(data.getReports()).thenReturn(reports);
//
//        assertEquals(HttpStatus.OK, controller.getReports().getStatusCode());
//    }
//}
