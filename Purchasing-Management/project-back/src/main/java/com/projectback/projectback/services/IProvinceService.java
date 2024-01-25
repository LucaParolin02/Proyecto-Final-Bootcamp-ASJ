package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.ProvinceModel;


public interface IProvinceService {
	
	 List<ProvinceModel> getProvincesByCountry(Integer id);
}
