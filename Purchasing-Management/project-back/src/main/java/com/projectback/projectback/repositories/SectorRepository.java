package com.projectback.projectback.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.SectorModel;

@Repository
public interface SectorRepository  extends JpaRepository<SectorModel, Integer>{

	Optional<SectorModel> findByNameAndDeletedFalse(String name);
	List<SectorModel> findByDeletedFalse();
	List<SectorModel> findByDeletedTrue();
}
