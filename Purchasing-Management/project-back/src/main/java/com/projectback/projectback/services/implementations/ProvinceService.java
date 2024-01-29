package com.projectback.projectback.services.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.projectback.projectback.models.ProvinceModel;
import com.projectback.projectback.repositories.ProvinceRepository;
import com.projectback.projectback.services.IProvinceService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProvinceService implements IProvinceService {
	
	@Autowired
	ProvinceRepository provinceRepository;
	
	@Override
	public List<ProvinceModel> getProvincesByCountry(Integer id) {
        return provinceRepository.findByCountryId(id);
    }
	
	@Override
	public ProvinceModel getProvinceById(Integer id) {
	    Optional<ProvinceModel> optionalProvince = provinceRepository.findById(id);
	    if (optionalProvince.isPresent()) {
	        return optionalProvince.get();
	    } 
	    throw new EntityNotFoundException("Province with ID " + id + " not found");
	}
}
