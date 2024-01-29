package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.CountryModel;

public interface ICountryService {
	
	 List<CountryModel> getCountries();
	 CountryModel getCountryById(Integer id);
}
