package com.projectback.projectback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.VatModel;

@Repository
public interface VatRepository extends JpaRepository<VatModel, Integer>{

	List<VatModel> findByDeletedFalse();
	
}
