package com.projectback.projectback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.StatusModel;

@Repository
public interface StatusRepository extends JpaRepository<StatusModel, Integer>{

	List<StatusModel> findByDeletedFalse();
	
}
