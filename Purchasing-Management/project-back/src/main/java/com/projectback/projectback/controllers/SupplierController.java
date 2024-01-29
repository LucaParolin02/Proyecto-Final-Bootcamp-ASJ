package com.projectback.projectback.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projectback.projectback.errorsInputs.ErrorsInputs;
import com.projectback.projectback.models.CityModel;
import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.models.ProvinceModel;
import com.projectback.projectback.models.SectorModel;
import com.projectback.projectback.models.SupplierModel;
import com.projectback.projectback.models.VatModel;
import com.projectback.projectback.services.ICityService;
import com.projectback.projectback.services.ICountryService;
import com.projectback.projectback.services.IProvinceService;
import com.projectback.projectback.services.ISectorService;
import com.projectback.projectback.services.ISupplierService;
import com.projectback.projectback.services.IVatService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/suppliers")
public class SupplierController {
	
	@Autowired
	ISupplierService iSupplierService;
	@Autowired
	ICountryService iCountryService;
	@Autowired
	IProvinceService iProvinceService;
	@Autowired
	ICityService iCityService;
	@Autowired
	IVatService iVatService;
	@Autowired
	ISectorService iSectorService;
	
    @GetMapping("/countries")
    public ResponseEntity<List<CountryModel>> getAllCountries() {
        return ResponseEntity.ok(iCountryService.getCountries());
    }

    @GetMapping("/provinces/{id}")
    public ResponseEntity<List<ProvinceModel>> getAllProvinces(@PathVariable Integer id) {
        return ResponseEntity.ok(iProvinceService.getProvincesByCountry(id));
    }
    
    
    @GetMapping("/cities/{id}")
    public ResponseEntity<List<CityModel>> getAllCities(@PathVariable Integer id){
    	return ResponseEntity.ok(iCityService.getCitiesByProvince(id));
    }
    
    @GetMapping("/vats")
    public ResponseEntity<List<VatModel>> getAllVats(){
    	return ResponseEntity.ok(iVatService.getVats());
    }
    
    @GetMapping("/sectors")
    public ResponseEntity<List<SectorModel>> getAllSectors(){
    	return ResponseEntity.ok(iSectorService.getSectors());
    }
    
    @PostMapping("/sectors/add")
    public ResponseEntity<Object> postSector(@Valid @RequestBody SectorModel sector, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(iSectorService.postSector(sector), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/sectors/{id}")
    public ResponseEntity<Object> deleteSector(@PathVariable Integer id){
    	try {
    		return new ResponseEntity<Object>(iSectorService.deleteSector(id), HttpStatus.NO_CONTENT);
    	}
    	catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
    }
    
    @GetMapping()
    public ResponseEntity<List<SupplierModel>> getAllSuppliers(){
    	return ResponseEntity.ok(iSupplierService.getSuppliers());
    }
    
    @PostMapping("/add")
    public ResponseEntity<Object> addSupplier(@Valid @RequestBody SupplierModel supplier, BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<>(iSupplierService.postSupplier(supplier), HttpStatus.CREATED);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSupplier(@PathVariable Integer id){
    	try {
    		return new ResponseEntity<Object>(iSupplierService.deleteSupplier(id), HttpStatus.NO_CONTENT);
    	}
    	catch (Exception e) {
    		return new ResponseEntity<Object>(e.getMessage(),HttpStatus.NOT_FOUND);
    	}
    }
}

