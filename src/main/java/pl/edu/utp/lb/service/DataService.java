package pl.edu.utp.lb.service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.utp.lb.model.AnnotationEntity;
import pl.edu.utp.lb.model.AnnotationMerged;
import pl.edu.utp.lb.model.AnnotationResource;
import pl.edu.utp.lb.model.Event;
import pl.edu.utp.lb.model.ReportEntity;
import pl.edu.utp.lb.model.ReportMerged;
import pl.edu.utp.lb.model.ReportResource;

/**
 *
 * @author Artur Mokosa
 */
@Service
public class DataService {

    private final AnnotationRepository annotations;
    private final ReportRepository reports;
    private final ResourceFactory resources;

    @Autowired
    public DataService(AnnotationRepository annotations, ReportRepository reports, ResourceFactory factory) {

        this.annotations = annotations;
        this.reports = reports;
        this.resources = factory;
    }

    public boolean postReport(ReportResource reportResource) {

        ReportEntity reportEntity = new ReportEntity(
                null,
                reportResource.getSystemId(),
                reportResource.getApplicantId(),
                reportResource.getEventType(),
                reportResource.getOccuredAt(),
                Date.from(Instant.now()).toString());
        reportEntity = reports.saveAndFlush(reportEntity);

        AnnotationEntity annotationEntity = new AnnotationEntity(
                null,
                reportEntity.getId(),
                reportResource.getAnnotation().getApplicantId(),
                Date.from(Instant.now()).toString(),
                reportResource.getAnnotation().getEventDetails());
        annotationEntity = annotations.saveAndFlush(annotationEntity);

        return true;
    }

    public boolean patchReport(long reportId, AnnotationResource annotationResource) {

        AnnotationEntity annotationEntity = new AnnotationEntity(
                null,
                reportId,
                annotationResource.getApplicantId(),
                Date.from(Instant.now()).toString(),
                annotationResource.getEventDetails());
        annotationEntity = annotations.saveAndFlush(annotationEntity);

        return true;
    }

    public ReportMerged getReport(long reportId) throws Exception {

        ReportEntity reportEntity = reports.findOne(reportId);
        List<AnnotationEntity> annotationEntities = annotations.findByParentId(reportId);

        List<AnnotationMerged> annotationsMerged = new ArrayList<>();
        for (AnnotationEntity a : annotationEntities) {
            annotationsMerged.add(
                    new AnnotationMerged(
                            resources.getEmployeeById(
                                    a.getApplicantId()).getName(),
                            a.getCreatedAt(),
                            a.getEventDetails()));
        }

        ReportMerged report = new ReportMerged(
                reportEntity.getId().toString(),
                resources.getSystemById(reportEntity.getSystemId()).getName(),
                resources.getEmployeeById(reportEntity.getApplicantId()).getName(),
                reportEntity.getEventType(),
                reportEntity.getOccuredAt(),
                reportEntity.getCreatedAt(),
                annotationsMerged);

        return report;
    }

    public List<ReportMerged> getReports(Long applicant, Event.Type type) throws Exception {

        List<ReportEntity> reportEntities;

        if (applicant != null && type != null) {
            reportEntities = reports.findByApplicantIdAndEventType(applicant, type);
        } else {
            if (applicant != null) {
                reportEntities = reports.findByApplicantId(applicant);
            } else if (type != null) {
                reportEntities = reports.findByEventType(type);
            } else {
                reportEntities = reports.findAll();
            }
        }

        List<ReportMerged> merged = new ArrayList<>();

        for (ReportEntity reportEntity : reportEntities) {

            List<AnnotationEntity> annotationEntities = annotations.findByParentId(reportEntity.getId());
            List<AnnotationMerged> annotationsMerged = new ArrayList<>();

            for (AnnotationEntity a : annotationEntities) {
                annotationsMerged.add(
                        new AnnotationMerged(
                                resources.getEmployeeById(
                                        a.getApplicantId()).getName(),
                                a.getCreatedAt(),
                                a.getEventDetails()));
            }

            ReportMerged report = new ReportMerged(
                    reportEntity.getId().toString(),
                    resources.getSystemById(reportEntity.getSystemId()).getName(),
                    resources.getEmployeeById(reportEntity.getApplicantId()).getName(),
                    reportEntity.getEventType(),
                    reportEntity.getOccuredAt(),
                    reportEntity.getCreatedAt(),
                    annotationsMerged);

            merged.add(report);
        }

        return merged;
    }

//    public List<ReportMerged> getReports() throws Exception {
//
//        List<ReportEntity> reportEntities = reports.findAll();
//        List<ReportMerged> merged = new ArrayList<>();
//
//        for (ReportEntity reportEntity : reportEntities) {
//
//            List<AnnotationEntity> annotationEntities = annotations.findByParentId(reportEntity.getId());
//            List<AnnotationMerged> annotationsMerged = new ArrayList<>();
//
//            for (AnnotationEntity a : annotationEntities) {
//                annotationsMerged.add(
//                        new AnnotationMerged(
//                                resources.getEmployeeById(
//                                        a.getApplicantId()).getName(),
//                                a.getCreatedAt(),
//                                a.getEventDetails()));
//            }
//
//            ReportMerged report = new ReportMerged(
//                    reportEntity.getId(),
//                    resources.getSystemById(reportEntity.getSystemId()).getName(),
//                    resources.getEmployeeById(reportEntity.getApplicantId()).getName(),
//                    reportEntity.getEventType(),
//                    reportEntity.getOccuredAt(),
//                    reportEntity.getCreatedAt(),
//                    annotationsMerged);
//
//            merged.add(report);
//        }
//
//        return merged;
//    }
}
