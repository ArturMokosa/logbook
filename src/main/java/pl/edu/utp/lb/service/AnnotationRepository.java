/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.edu.utp.lb.service;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.utp.lb.model.AnnotationEntity;

/**
 *
 * @author Artur Mokosa
 */
@Repository
public interface AnnotationRepository extends JpaRepository<AnnotationEntity, Long> {
    
    public List<AnnotationEntity> findByParentId(Long parentId); 
}
