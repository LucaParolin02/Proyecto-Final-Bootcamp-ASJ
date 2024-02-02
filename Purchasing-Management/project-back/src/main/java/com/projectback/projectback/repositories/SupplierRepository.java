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
    boolean existsByCodeAndIdNot(String code, Integer id);
    boolean existsByNameAndIdNot(String name,Integer id);
    boolean existsByEmailAndIdNot(String email,Integer id);
    boolean existsByCuitAndIdNot(String cuit,Integer id);
    boolean existsByPhoneAndIdNot(String phone,Integer id);
    List<SupplierModel> findBySectorAndDeletedFalse(SectorModel sector);
    List<SupplierModel> findByDeletedFalse();
    List<SupplierModel> findByDeletedTrue();
}
