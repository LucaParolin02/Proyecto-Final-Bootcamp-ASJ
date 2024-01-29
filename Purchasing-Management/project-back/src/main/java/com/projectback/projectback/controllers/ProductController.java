package com.projectback.projectback.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectback.projectback.errorsInputs.ErrorsInputs;
import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.services.ICategoryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

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
	
	@PostMapping("/categories/add")
	public ResponseEntity<Object> postCategory(@Valid @RequestBody CategoryModel category, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<>(iCategoryService.postCategory(category), HttpStatus.CREATED);
	}

	@DeleteMapping("/categories/{id}")
	public ResponseEntity<Object> deleteCategory(@PathVariable Integer id) {
	    try {
	        return new ResponseEntity<Object>(iCategoryService.deleteCategory(id), HttpStatus.NO_CONTENT);
	    } catch (EntityNotFoundException e) {
	        return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
	    }
	}

}
