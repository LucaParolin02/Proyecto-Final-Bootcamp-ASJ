package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.exceptions.OperationNotAllowedException;
import com.projectback.projectback.models.SectorModel;
import com.projectback.projectback.models.SupplierModel;
import com.projectback.projectback.repositories.SectorRepository;
import com.projectback.projectback.repositories.SupplierRepository;
import com.projectback.projectback.services.ISectorService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SectorService implements ISectorService {
	
	@Autowired
	SectorRepository sectorRepository;
	@Autowired
	SupplierRepository supplierRepository;
	
	@Override
	public List<SectorModel> getSectors(){
		return sectorRepository.findAll();
	}
	
	@Override
	public SectorModel postSector(SectorModel sectorModel) {
		sectorModel.setCreated(Timestamp.from(Instant.now()));
		sectorModel.setUpdated(Timestamp.from(Instant.now()));
		return sectorRepository.save(sectorModel);
	}
	
	@Override
	public SectorModel deleteSector(Integer id) {
	    Optional<SectorModel> optionalSector = sectorRepository.findById(id);
	    if (optionalSector.isPresent()) {
	        SectorModel sectorToDelete = optionalSector.get();
	        List<SupplierModel> suppliers = supplierRepository.findBySectorAndDeletedFalse(sectorToDelete);
	        if (!suppliers.isEmpty()) {
	            throw new OperationNotAllowedException("Cannot delete sector. It is associated with active suppliers.");
	        }
	        sectorToDelete.setDeleted(true);
	        return sectorRepository.save(sectorToDelete);
	    } else {
	        throw new EntityNotFoundException("Sector with ID " + id + " not found");
	    }
	}
	
	@Override
	public SectorModel getSectorById(Integer id) {
	    Optional<SectorModel> optionalSector = sectorRepository.findById(id);
	    if (optionalSector.isPresent()) {
	        return optionalSector.get();
	    } 
	    throw new EntityNotFoundException("Sector with ID " + id + " not found");
	}

}
