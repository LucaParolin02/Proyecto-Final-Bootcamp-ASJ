package com.projectback.projectback.services.implementations;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.repositories.CountryRepository;
import com.projectback.projectback.services.ICountryService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CountryService implements ICountryService {
	
	@Autowired 
	CountryRepository countryRepository;
	
	@Override
	public List<CountryModel> getCountries() {
		return countryRepository.findAll();
	}
	
	@Override
	public CountryModel getCountryById(Integer id) {
	    Optional<CountryModel> optionalCountry = countryRepository.findById(id);
	    if (optionalCountry.isPresent()) {
	        return optionalCountry.get();
	    } 
	    throw new EntityNotFoundException("Country with ID " + id + " not found");
	}
	
}
