package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.SupplierModel;

public interface ISupplierService {

	List<SupplierModel> getSuppliers();
	List<SupplierModel> getDeletedSuppliers();
	SupplierModel restoreSupplier(Integer id, SupplierModel supplier);
	SupplierModel deleteSupplier(Integer id);
	SupplierModel updateSupplier(Integer id,SupplierModel supplier);
	SupplierModel getSupplierById(Integer id);
	SupplierModel postSupplier(SupplierModel supplier);
	
}
