package com.projectback.projectback.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.CategoryModel;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Integer>{

	List<CategoryModel> findByDeletedFalse();
	List<CategoryModel> findByDeletedTrue();
	Optional<CategoryModel> findByNameAndDeletedFalse(String name);
}
