package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.SectorModel;

@Repository
public interface SectorRepository  extends JpaRepository<SectorModel, Integer>{

}
