package com.projectback.projectback.services.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.projectback.projectback.models.ProvinceModel;
import com.projectback.projectback.repositories.ProvinceRepository;
import com.projectback.projectback.services.IProvinceService;

@Service
public class ProvinceService implements IProvinceService {
	
	@Autowired
	ProvinceRepository provinceRepository;
	
	@Override
	public List<ProvinceModel> getProvincesByCountry(Integer id) {
        return provinceRepository.findByCountryId(id);
    }
	

}
