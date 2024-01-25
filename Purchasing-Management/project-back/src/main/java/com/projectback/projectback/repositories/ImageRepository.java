package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.ImageModel;

@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Integer>{

}
