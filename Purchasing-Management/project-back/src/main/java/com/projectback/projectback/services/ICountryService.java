package com.projectback.projectback.services;

import java.util.List;
import java.util.Optional;

import com.projectback.projectback.models.CountryModel;

public interface ICountryService {
	
	public List<CountryModel> getCountries();
	public Optional<CountryModel> getCountryById(Integer countryId);
}
