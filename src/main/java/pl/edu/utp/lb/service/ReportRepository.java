/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.edu.utp.lb.service;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.utp.lb.model.Event;
import pl.edu.utp.lb.model.ReportEntity;

/**
 *
 * @author Artur Mokosa
 */
@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    
    public List<ReportEntity> findBySystemId(String systemId); 
    public List<ReportEntity> findByApplicantId(Long applicantId);
    public List<ReportEntity> findByEventType(Event.Type eventType); 
    public List<ReportEntity> findByApplicantIdAndEventType(Long applicantId, Event.Type eventType);
}
