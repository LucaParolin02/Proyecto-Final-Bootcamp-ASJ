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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectback.projectback.errorsInputs.ErrorsInputs;
import com.projectback.projectback.exceptions.OperationNotAllowedException;
import com.projectback.projectback.models.CategoryModel;
import com.projectback.projectback.models.ImageModel;
import com.projectback.projectback.models.ProductModel;
import com.projectback.projectback.services.ICategoryService;
import com.projectback.projectback.services.IImageService;
import com.projectback.projectback.services.IProductService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	ICategoryService iCategoryService;
	@Autowired
	IProductService iProductService;
	@Autowired
	IImageService iImageService;
	
	@GetMapping("/categories")
	public ResponseEntity<List<CategoryModel>> getAllCategories(){
		return ResponseEntity.ok(iCategoryService.getAllCategories());
	}
	
	@PostMapping("/categories/add")
	public ResponseEntity<Object> postCategory(@Valid @RequestBody CategoryModel category, BindingResult bindingResult) {
	    if (bindingResult.hasErrors()) {
	        Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
	        return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
	    }
	    return new ResponseEntity<Object>(iCategoryService.postCategory(category), HttpStatus.CREATED);
	}

	@DeleteMapping("/categories/{id}")
	public ResponseEntity<Object> deleteCategory(@PathVariable Integer id) {
	    try {
	        return new ResponseEntity<Object>(iCategoryService.deleteCategory(id), HttpStatus.NO_CONTENT);
	    } catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@PutMapping("/categories/{id}")
	public ResponseEntity<Object> editCategory(@PathVariable Integer id,@Valid @RequestBody CategoryModel category, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String,String> errors = new ErrorsInputs().validacionInputs(bindingResult);
			return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iCategoryService.editCategory(id, category), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<ProductModel>> getAllProducts(){
		return ResponseEntity.ok(iProductService.getAllProducts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductModel> getProduct(@PathVariable Integer id){
		return ResponseEntity.ok(iProductService.getProductById(id));
	}
	
	@GetMapping("/supplier/{id}")
	public ResponseEntity<List<ProductModel>> getProductsBySupp(@PathVariable Integer id){
		return ResponseEntity.ok(iProductService.getProductsBySupplier(id));
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<ProductModel>> getDeletedProducts(){
		return ResponseEntity.ok(iProductService.getDeletedProducts());
	}
	
	@PostMapping("/add")
	public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductModel product, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
			return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iProductService.postProduct(product), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteProduct(@PathVariable Integer id){
		try { 
			return new ResponseEntity<Object>(iProductService.deleteProduct(id), HttpStatus.NO_CONTENT);
		} catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> editProduct(@PathVariable Integer id, @Valid @RequestBody ProductModel product, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iProductService.editProduct(id, product), HttpStatus.OK);
	}
	
	@GetMapping("/images/{id}")
	public ResponseEntity<List<ImageModel>> getImages(@PathVariable Integer id){
		return ResponseEntity.ok(iImageService.getImagesByProduct(id));
	}
	
	@PostMapping("/image/add")
	public ResponseEntity<Object> addImage(@Valid @RequestBody ImageModel image, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iImageService.addImage(image), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/image/{id}")
	public ResponseEntity<Object> deleteImage(@PathVariable Integer id){
		try { 
			return new ResponseEntity<Object>(iImageService.deleteImage(id), HttpStatus.NO_CONTENT);
		} catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@PutMapping("/image/{id}")
	public ResponseEntity<Object> editImage(@PathVariable Integer id, @Valid @RequestBody ImageModel image, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iImageService.editImage(id, image), HttpStatus.OK);
	}
}
