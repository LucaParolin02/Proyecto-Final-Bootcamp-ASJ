package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Integer> {

}
