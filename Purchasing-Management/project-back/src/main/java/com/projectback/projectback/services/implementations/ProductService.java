package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.exceptions.DuplicateEntityException;
import com.projectback.projectback.models.ProductModel;
import com.projectback.projectback.repositories.ProductRepository;
import com.projectback.projectback.services.ICategoryService;
import com.projectback.projectback.services.IProductService;
import com.projectback.projectback.services.ISupplierService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService implements IProductService {
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	ICategoryService iCategoryService;
	@Autowired
	ISupplierService iSupplierService;
	
	@Override
	public List<ProductModel> getAllProducts(){
		return productRepository.findByDeletedFalse();
	}
	
	@Override
	public List<ProductModel> getDeletedProducts(){
		return productRepository.findByDeletedTrue();
	}
	
	@Override
	public List<ProductModel> getProductsBySupplier(Integer id){
		return productRepository.findBySupplierIdAndDeletedFalse(id);
	}
	
	@Override
	public ProductModel postProduct(ProductModel product) {
		validateUniqueFields(product);
		Integer categoryId = product.getCategory().getId();
		Integer supplierId = product.getSupplier().getId();
		iSupplierService.getSupplierById(supplierId);
		iCategoryService.getCategoryById(categoryId);
		product.setCreated(Timestamp.from(Instant.now()));
		product.setUpdated(Timestamp.from(Instant.now()));
		return productRepository.save(product);
	}
	
	@Override
	public ProductModel getProductById(Integer id) {
		Optional<ProductModel> product = productRepository.findById(id);
		if (product.isPresent()) {
			return product.get();
		}
		throw new EntityNotFoundException("Product with ID " + id + " not found");
	}
	
	@Override
	public ProductModel deleteProduct(Integer id) {
		ProductModel productToDelete = getProductById(id);
		productToDelete.setDeleted(true);
		return productRepository.save(productToDelete);
	}
	
	@Override
	public ProductModel editProduct(Integer id, ProductModel product) {
		validateEditUniqueFields(id, product);
		ProductModel existingProduct = getProductById(id);
		existingProduct.setName(product.getName() != null ? product.getName() : existingProduct.getName());
		existingProduct.setSku(product.getSku() != null ? product.getSku() : existingProduct.getSku());
		existingProduct.setDesc(product.getDesc() != null ? product.getDesc() : existingProduct.getDesc());
		existingProduct.setPrice(product.getPrice() != null ? product.getPrice() : existingProduct.getPrice());
		if (product.getCategory() != null) {
			Integer categoryId = product.getCategory().getId();
			iCategoryService.getCategoryById(categoryId);
			existingProduct.setCategory(product.getCategory());
		}
		if (product.getSupplier() != null) {
			Integer supplierId = product.getSupplier().getId();
			iSupplierService.getSupplierById(supplierId);
			existingProduct.setSupplier(product.getSupplier());
		}
		existingProduct.setUpdated(Timestamp.from(Instant.now()));
		return productRepository.save(existingProduct);
	}

	
	private void validateUniqueFields(ProductModel product) {
        if (productRepository.existsBySku(product.getSku())) {
            throw new DuplicateEntityException("Product with sku " + product.getSku() + " already exists");
        }
        if (productRepository.existsByName(product.getName())) {
            throw new DuplicateEntityException("Product with name " + product.getName() + " already exists");
        }
	}
	
	private void validateEditUniqueFields(Integer id, ProductModel product) {
        if (productRepository.existsByNameAndIdNot(product.getSku(),id)) {
            throw new DuplicateEntityException("Product with sku " + product.getSku() + " already exists");
        }
        if (productRepository.existsByNameAndIdNot(product.getName(),id)) {
            throw new DuplicateEntityException("Product with name " + product.getName() + " already exists");
        }
	}
}
