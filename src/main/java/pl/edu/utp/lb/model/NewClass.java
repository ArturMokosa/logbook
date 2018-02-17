package pl.edu.utp.lb.model;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import pl.edu.utp.lb.exception.ExtractionException;
import pl.edu.utp.lb.service.ResourceFactory;

/**
 *
 * @author Artur Mokosa
 */
public class NewClass {

//    ResourceFactory factory = new ResourceFactory(null);
//
//    public String post(ReportResource reportResource) {
//
//        ReportEntity reportEntity = new ReportEntity(
//                null,
//                reportResource.getSystemId(),
//                reportResource.getApplicantId(),
//                reportResource.getEventType(), 
//                reportResource.getOccuredAt(),
//                Timestamp.valueOf(LocalDateTime.now()));
//        // to DATABASE ->
//
//        AnnotationEntity annotationEntity = new AnnotationEntity(
//                null,
//                reportEntity.getId(),
//                reportResource.getAnnotation().getApplicantId(),
//                Timestamp.from(Instant.now()),
//                reportResource.getAnnotation().getEventDetails());
//        // to DATABASE ->
//
//        return "OK";
//    }
//
//    public String patch(long reportId, AnnotationResource annotationResource) {
//
//        AnnotationEntity annotationEntity = new AnnotationEntity(
//                null,
//                reportId,
//                annotationResource.getApplicantId(),
//                Timestamp.from(Instant.now()),
//                annotationResource.getEventDetails());
//        // to DATABASE ->
//
//        return "OK";
//    }
//
//    public ReportMerged get() throws Exception {
//
//        // <- from DATABASE
//        ReportEntity reportEntity = new ReportEntity();
//
//        // <- from DATABASE
//        List<AnnotationEntity> annotationEntities = new ArrayList<>();
//
//        List<AnnotationMerged> annotationsMerged = new ArrayList<>();
//        for (AnnotationEntity a : annotationEntities) {
//            annotationsMerged.add(
//                    new AnnotationMerged(
//                            factory.getEmployeeById(
//                                    a.getApplicantId()).getName(),
//                            a.getCreatedAt(),
//                            a.getEventDetails()));
//        }
//
//        ReportMerged report = new ReportMerged(
//                reportEntity.getId(),
//                factory.getSystemById(reportEntity.getSystemId()).getName(),
//                factory.getEmployeeById(reportEntity.getApplicantId()).getName(),
//                reportEntity.getEventType(),
//                reportEntity.getOccuredAt(),
//                reportEntity.getCreatedAt(),
//                annotationsMerged);
//
//        return report;
//    }
}
