package com.projectback.projectback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.services.ICategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	ICategoryService iCategoryService;
	
	@GetMapping("/categories")
	public ResponseEntity<List<CategoryModel>> getAllCategories(){
		return ResponseEntity.ok(iCategoryService.getAllCategories());
	}

}
