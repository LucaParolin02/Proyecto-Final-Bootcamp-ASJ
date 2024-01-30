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
import com.projectback.projectback.services.ICityService;
import com.projectback.projectback.services.ISectorService;
import com.projectback.projectback.services.ISupplierService;
import com.projectback.projectback.services.IVatService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SupplierService implements ISupplierService {
	
	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
	ISectorService iSectorService;
	@Autowired
	IVatService iVatService;
	@Autowired
	ICityService iCityService;
	
	@Override
	public List<SupplierModel> getSuppliers(){
		return supplierRepository.findByDeletedFalse();
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
		validateUniqueFields(supplier);
	    supplier.setCreated(Timestamp.from(Instant.now()));
	    supplier.setUpdated(Timestamp.from(Instant.now()));
	    supplier.setDeleted(false);
	    return supplierRepository.save(supplier);
	}
	
	@Override
    public SupplierModel deleteSupplier(Integer id) {
        SupplierModel supplierToDelete = getSupplierById(id);
        supplierToDelete.setDeleted(true);
        return supplierRepository.save(supplierToDelete);
    }
	
	@Override
	public SupplierModel updateSupplier(Integer id,SupplierModel supplier) {
		validateEditUniqueFields(supplier,id);
		SupplierModel existingSupplier = getSupplierById(id);	
	    if (supplier.getName() != null) {
	        existingSupplier.setName(supplier.getName());
	    }
	    if (supplier.getCode() != null) {
	        existingSupplier.setCode(supplier.getCode());
	    }
	    if (supplier.getLogo() != null) {
	        existingSupplier.setLogo(supplier.getLogo());
	    }
	    if (supplier.getWeb() != null) {
	        existingSupplier.setWeb(supplier.getWeb());
	    }
	    if (supplier.getEmail() != null) {
	        existingSupplier.setEmail(supplier.getEmail());
	    }
	    if (supplier.getPhone() != null) {
	        existingSupplier.setPhone(supplier.getPhone());
	    }
	    if (supplier.getStreet() != null) {
	        existingSupplier.setStreet(supplier.getStreet());
	    }
	    if (supplier.getSnumber() != null) {
	        existingSupplier.setSnumber(supplier.getSnumber());
	    }
	    if (supplier.getZip() != null) {
	        existingSupplier.setZip(supplier.getZip());
	    }
	    if (supplier.getSector() != null) {
	    	Integer sectorId = supplier.getSector().getId();
	    	iSectorService.getSectorById(sectorId);
	    	existingSupplier.setSector(supplier.getSector());
	    }
	    if (supplier.getVatCondition() != null) {
	    	Integer vatId = supplier.getVatCondition().getId();
	    	iVatService.getVatById(vatId);
	    	existingSupplier.setVatCondition(supplier.getVatCondition());
	    }
	    if (supplier.getCity() != null) {
	    	Integer cityId = supplier.getCity().getId();
	    	iCityService.getCityById(cityId);
	    	existingSupplier.setCity(supplier.getCity());
	    }
	    existingSupplier.setUpdated(Timestamp.from(Instant.now()));
	    return supplierRepository.save(existingSupplier);
	}
	
    private void validateUniqueFields(SupplierModel supplier) {
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
    }
    
    private void validateEditUniqueFields(SupplierModel supplier,Integer id) {
        if (supplierRepository.existsByCodeAndIdNot(supplier.getCode(),id)) {
            throw new DuplicateEntityException("Supplier with code " + supplier.getCode() + " already exists");
        }
        if (supplierRepository.existsByNameAndIdNot(supplier.getName(),id)) {
            throw new DuplicateEntityException("Supplier with name " + supplier.getName() + " already exists");
        }
        if (supplierRepository.existsByCuitAndIdNot(supplier.getCuit(),id)) {
            throw new DuplicateEntityException("Supplier with CUIT " + supplier.getCuit() + " already exists");
        }
        if (supplierRepository.existsByEmailAndIdNot(supplier.getEmail(),id)) {
            throw new DuplicateEntityException("Supplier with email " + supplier.getEmail() + " already exists");
        }
        if (supplierRepository.existsByPhoneAndIdNot(supplier.getPhone(),id)) {
            throw new DuplicateEntityException("Supplier with phone " + supplier.getPhone() + " already exists");
        }
    }

}
