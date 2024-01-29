package com.projectback.projectback.services.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.CityModel;
import com.projectback.projectback.repositories.CityRepository;
import com.projectback.projectback.services.ICityService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CityService implements ICityService {
	
	@Autowired
	CityRepository cityRepository;

	@Override
	public List<CityModel> getCitiesByProvince(Integer id){
		return cityRepository.findByProvinceId(id);
	}
	
	@Override
	public CityModel getCityById(Integer id) {
	    Optional<CityModel> optionalCity = cityRepository.findById(id);
	    if (optionalCity.isPresent()) {
	        return optionalCity.get();
	    } 
	    throw new EntityNotFoundException("City with ID " + id + " not found");
	}
}
