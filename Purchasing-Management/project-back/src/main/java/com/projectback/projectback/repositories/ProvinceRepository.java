package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.ProvinceModel;

@Repository
public interface ProvinceRepository extends JpaRepository<ProvinceModel, Integer> {
	
}
