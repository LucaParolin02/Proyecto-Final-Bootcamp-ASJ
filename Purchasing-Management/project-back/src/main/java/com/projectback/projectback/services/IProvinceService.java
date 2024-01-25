package com.projectback.projectback.services;

import java.util.List;
import java.util.Optional;

import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.models.ProvinceModel;


public interface IProvinceService {
	
	public List<ProvinceModel> getProvincesByCountry(CountryModel country);

	public Optional<ProvinceModel> getProvinceById(Integer provinceId);
}
