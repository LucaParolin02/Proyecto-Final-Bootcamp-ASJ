package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.ProductModel;

public interface IProductService {
	
	List<ProductModel> getAllProducts();
	List<ProductModel> getDeletedProducts();
	List<ProductModel> getProductsBySupplier(Integer id);
	ProductModel restoreProduct(Integer id);
	ProductModel postProduct(ProductModel product);
	ProductModel getProductById(Integer id);
	ProductModel deleteProduct(Integer id);
	ProductModel editProduct(Integer id, ProductModel product);
	
}
