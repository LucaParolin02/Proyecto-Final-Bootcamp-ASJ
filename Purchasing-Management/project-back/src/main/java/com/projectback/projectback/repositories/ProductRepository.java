package com.projectback.projectback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {
	
	List<ProductModel> findActiveProductsByCategory(CategoryModel category);
	List<ProductModel> findByDeletedFalse();
	List<ProductModel> findByDeletedTrue();
	List<ProductModel> findBySupplierIdAndDeletedFalse(Integer id);
	boolean existsBySku(String sku);
    boolean existsByName(String name);
    boolean existsByNameAndIdNot(String name,Integer id);
    boolean existsBySkuAndIdNot(String sku,Integer id);
	
}
