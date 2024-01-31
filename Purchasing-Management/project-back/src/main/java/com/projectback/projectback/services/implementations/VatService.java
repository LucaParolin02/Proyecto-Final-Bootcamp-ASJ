package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.VatModel;
import com.projectback.projectback.repositories.VatRepository;
import com.projectback.projectback.services.IVatService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VatService implements IVatService{
	
	@Autowired
	VatRepository vatRepository;
	
    @Override
    public List<VatModel> getVats() {
        return vatRepository.findByDeletedFalse();
    }
	
	@Override
	public VatModel getVatById(Integer id) {
	    Optional<VatModel> optionalVat = vatRepository.findById(id);
	    if (optionalVat.isPresent()) {
	        return optionalVat.get();
	    } 
	    throw new EntityNotFoundException("Vat with ID " + id + " not found");
	}
	
	@Override
	public VatModel addVat(VatModel vat) {
		vat.setCreated(Timestamp.from(Instant.now()));
		vat.setUpdated(Timestamp.from(Instant.now()));
		return vatRepository.save(vat);
	}

}
