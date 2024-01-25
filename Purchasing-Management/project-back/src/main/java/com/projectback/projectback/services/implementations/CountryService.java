package com.projectback.projectback.services.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.repositories.CountryRepository;
import com.projectback.projectback.services.ICountryService;

@Service
public class CountryService implements ICountryService {
	
	@Autowired 
	CountryRepository countryRepository;
	
	@Override
	public List<CountryModel> getCountries() {
		return countryRepository.findAll();
	}
	
	@Override
    public Optional<CountryModel> getCountryById(Integer countryId) {
        return countryRepository.findById(countryId);
    }
}
