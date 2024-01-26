package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.CityModel;

public interface ICityService {
	
	List<CityModel> getCitiesByProvince(Integer id);
	
	CityModel postCity(CityModel cityModel);
}
