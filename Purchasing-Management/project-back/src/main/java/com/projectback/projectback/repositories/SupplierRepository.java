package com.projectback.projectback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.SectorModel;
import com.projectback.projectback.models.SupplierModel;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierModel, Integer> {
	
	boolean existsByCode(String code);
    boolean existsByName(String name);
    boolean existsByCuit(String cuit);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    List<SupplierModel> findBySectorAndDeletedFalse(SectorModel sector);
    
}
