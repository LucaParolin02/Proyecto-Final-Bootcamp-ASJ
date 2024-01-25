package com.projectback.projectback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.models.ProvinceModel;
import com.projectback.projectback.services.ICountryService;
import com.projectback.projectback.services.IProvinceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/suppliers")
public class SupplierController {

	@Autowired
	ICountryService iCountryService;
	@Autowired
	IProvinceService iProvinceService;
	
    @GetMapping("/countries")
    public ResponseEntity<List<CountryModel>> getAllCountries() {
        return ResponseEntity.ok(iCountryService.getCountries());
    }
    
    @PostMapping("/countries/add")
    public ResponseEntity<CountryModel> createCountry(@RequestBody CountryModel country){
    	return ResponseEntity.ok(iCountryService.postCountry(country));
    }

    @GetMapping("/provinces/{id}")
    public ResponseEntity<List<ProvinceModel>> getAllProvinces(@PathVariable Integer id) {
        return ResponseEntity.ok(iProvinceService.getProvincesByCountry(id));
    }
    
    @PostMapping("/provinces/add")
    public ResponseEntity<ProvinceModel> createProvince(@RequestBody ProvinceModel province){
    	return ResponseEntity.ok(iProvinceService.postProvince(province));
    }
}
