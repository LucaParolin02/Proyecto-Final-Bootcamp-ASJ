package com.projectback.projectback.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.repositories.CategoryRepository;
import com.projectback.projectback.services.ICategoryService;

@Service
public class CategoryService implements ICategoryService {
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Override
	public List<CategoryModel> getAllCategories(){
		return categoryRepository.findAll();
	}

}
