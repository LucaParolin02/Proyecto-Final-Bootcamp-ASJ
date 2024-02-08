package com.projectback.projectback.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projectback.projectback.models.ImageModel;


@Repository
public interface ImageRepository extends JpaRepository<ImageModel, Integer>{

	List<ImageModel> findByProduct_IdAndDeletedFalse(Integer productId);
	List<ImageModel> findByProduct_IdAndDeletedTrue(Integer productId);
	Optional<ImageModel> findByUrlAndDeletedFalse(String url);
	List<ImageModel> findByDeletedFalse();
	
}
