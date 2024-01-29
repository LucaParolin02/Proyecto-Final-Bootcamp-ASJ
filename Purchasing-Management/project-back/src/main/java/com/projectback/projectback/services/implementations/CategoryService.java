package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.exceptions.OperationNotAllowedException;
import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.models.ProductModel;
import com.projectback.projectback.repositories.CategoryRepository;
import com.projectback.projectback.repositories.ProductRepository;
import com.projectback.projectback.services.ICategoryService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryService implements ICategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ProductRepository productRepository;
	
	@Override
	public List<CategoryModel> getAllCategories(){
		return categoryRepository.findAll();
	}
	
	@Override
	public CategoryModel postCategory(CategoryModel category) {
		category.setCreated(Timestamp.from(Instant.now()));
		category.setUpdated(Timestamp.from(Instant.now()));
		return categoryRepository.save(category);
	}
	
	@Override
	public CategoryModel deleteCategory(Integer id) {
	    Optional<CategoryModel> optionalCategory = categoryRepository.findById(id);
	    if (optionalCategory.isPresent()) {
	        CategoryModel categoryToDelete = optionalCategory.get();
	        List<ProductModel> products = productRepository.findActiveProductsByCategory(categoryToDelete);
	        if (!products.isEmpty()) {
	            throw new OperationNotAllowedException("Cannot delete category. It is associated with active products.");
	        }
	        categoryToDelete.setDeleted(true);
	        return categoryRepository.save(categoryToDelete);
	    } else {
	        throw new EntityNotFoundException("Category with ID " + id + " not found");
	    }
	}
	
	@Override
	public CategoryModel getCategoryById(Integer id) {
	    Optional<CategoryModel> optionalCategory = categoryRepository.findById(id);
	    if (optionalCategory.isPresent()) {
	        return optionalCategory.get();
	    } 
	    throw new EntityNotFoundException("Category with ID " + id + " not found");
	}

}
