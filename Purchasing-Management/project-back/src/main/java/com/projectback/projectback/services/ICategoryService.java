package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.CategoryModel;

public interface ICategoryService {

	List<CategoryModel> getAllCategories();
	List<CategoryModel> getDeletedCategories();
	CategoryModel postCategory(CategoryModel category);
	CategoryModel deleteCategory(Integer id);
	CategoryModel restoreCategory(Integer id, CategoryModel category);
	CategoryModel getCategoryById(Integer id);
	CategoryModel editCategory(Integer id, CategoryModel category);
	
}