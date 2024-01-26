package com.projectback.projectback.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.CityModel;
import com.projectback.projectback.repositories.CityRepository;
import com.projectback.projectback.services.ICityService;

@Service
public class CityService implements ICityService {
	
	@Autowired
	CityRepository cityRepository;

	@Override
	public List<CityModel> getCitiesByProvince(Integer id){
		return cityRepository.findByProvinceId(id);
	}
}
