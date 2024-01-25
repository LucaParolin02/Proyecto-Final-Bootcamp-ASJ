package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.SupplierModel;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierModel, Integer> {

}
