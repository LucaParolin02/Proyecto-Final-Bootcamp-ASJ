package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.exceptions.DuplicateEntityException;
import com.projectback.projectback.models.SupplierModel;
import com.projectback.projectback.repositories.SupplierRepository;
import com.projectback.projectback.services.ISupplierService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SupplierService implements ISupplierService {
	
	@Autowired
	SupplierRepository supplierRepository;
	
	@Override
	public List<SupplierModel> getSuppliers(){
		return supplierRepository.findAll();
	}
	
	@Override
	public SupplierModel getSupplierById(Integer id) {
		Optional<SupplierModel> optionalSupplier = supplierRepository.findById(id);	
		if (optionalSupplier.isPresent()) {
			return optionalSupplier.get();
		} 
		throw new EntityNotFoundException("Supplier with ID " + id + " not found");
	}
	
	@Override
	public SupplierModel postSupplier(SupplierModel supplier) {
	    if (supplierRepository.existsByCode(supplier.getCode())) {
	        throw new DuplicateEntityException("Supplier with code " + supplier.getCode() + " already exists");
	    }
	    if (supplierRepository.existsByName(supplier.getName())) {
	        throw new DuplicateEntityException("Supplier with name " + supplier.getName() + " already exists");
	    }
	    if (supplierRepository.existsByCuit(supplier.getCuit())) {
	        throw new DuplicateEntityException("Supplier with CUIT " + supplier.getCuit() + " already exists");
	    }
	    if (supplierRepository.existsByEmail(supplier.getEmail())) {
	        throw new DuplicateEntityException("Supplier with email " + supplier.getEmail() + " already exists");
	    }
	    if (supplierRepository.existsByPhone(supplier.getPhone())) {
	        throw new DuplicateEntityException("Supplier with phone " + supplier.getPhone() + " already exists");
	    }
	    supplier.setCreated(Timestamp.from(Instant.now()));
	    supplier.setUpdated(supplier.getCreated());
	    supplier.setDeleted(false);
	    return supplierRepository.save(supplier);
	}
	
	@Override
	public SupplierModel deleteSupplier(Integer id) {
		Optional<SupplierModel> optionalSupplier = supplierRepository.findById(id);
		if (optionalSupplier.isPresent()) {
			SupplierModel supplierToDelete = optionalSupplier.get();
			supplierToDelete.setDeleted(true);
			supplierRepository.save(supplierToDelete);
		}
		throw new EntityNotFoundException("Supplier with ID " + id + " not found");
	}
	
	@Override
	public SupplierModel updateSupplier(Integer id,SupplierModel supplier) {
		Optional<SupplierModel> optionalSupplier = supplierRepository.findById(id);
		if (optionalSupplier.isPresent()) {
			SupplierModel supplierEdit = optionalSupplier.get();
			if (supplier.getName()!=null)
				supplierEdit.setName(supplier.getName());
			if (supplier.getCode()!=null)
				supplierEdit.setCode(supplier.getCode());
			if (supplier.getLogo()!=null)
				supplierEdit.setLogo(supplier.getLogo());
			if (supplier.getWeb()!=null)
				supplierEdit.setWeb(supplier.getWeb());
			if (supplier.getEmail()!=null)
				supplierEdit.setEmail(supplier.getEmail());
			if (supplier.getPhone()!=null)
				supplierEdit.setPhone(supplier.getPhone());
			if (supplier.getStreet()!=null)
				supplierEdit.setStreet(supplier.getStreet());
			if (supplier.getSnumber()!=null)
				supplierEdit.setSnumber(supplier.getSnumber());
			if (supplier.getZip()!=null)
				supplierEdit.setZip(supplier.getZip());		
			supplierEdit.setUpdated(Timestamp.from(Instant.now()));
			return supplierRepository.save(supplierEdit);
		}
		throw new EntityNotFoundException("Supplier with ID " + id + " not found");
	}

}
