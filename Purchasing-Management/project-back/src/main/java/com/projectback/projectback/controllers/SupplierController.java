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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projectback.projectback.errorsInputs.ErrorsInputs;
import com.projectback.projectback.exceptions.OperationNotAllowedException;
import com.projectback.projectback.models.ContactModel;
import com.projectback.projectback.models.CountryModel;
import com.projectback.projectback.models.ProvinceModel;
import com.projectback.projectback.models.SectorModel;
import com.projectback.projectback.models.SupplierModel;
import com.projectback.projectback.models.VatModel;
import com.projectback.projectback.services.IContactService;
import com.projectback.projectback.services.ICountryService;
import com.projectback.projectback.services.IProvinceService;
import com.projectback.projectback.services.ISectorService;
import com.projectback.projectback.services.ISupplierService;
import com.projectback.projectback.services.IVatService;

import jakarta.persistence.EntityNotFoundException;
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
	IVatService iVatService;
	@Autowired
	ISectorService iSectorService;
	@Autowired
	IContactService iContactService;
	
	@PostMapping("/vats/add")
	public ResponseEntity<VatModel> addVat(@RequestBody VatModel vat){
		return ResponseEntity.ok(iVatService.addVat(vat));
	}
	
    @GetMapping("/countries")
    public ResponseEntity<List<CountryModel>> getAllCountries() {
        return ResponseEntity.ok(iCountryService.getCountries());
    }

    @GetMapping("/provinces/{id}")
    public ResponseEntity<List<ProvinceModel>> getAllProvinces(@PathVariable Integer id) {
        return ResponseEntity.ok(iProvinceService.getProvincesByCountry(id));
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
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PutMapping("/sectors/{id}")
    public ResponseEntity<Object> editSector(@PathVariable Integer id,@Valid @RequestBody SectorModel sector, BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String,String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<Object>(iSectorService.editSector(id, sector), HttpStatus.OK);
    }
    
    @GetMapping()
    public ResponseEntity<List<SupplierModel>> getAllSuppliers(){
    	return ResponseEntity.ok(iSupplierService.getSuppliers());
    }
    
    @GetMapping("/deleteds")
    public ResponseEntity<List<SupplierModel>> getDeletedSuppliers(){
    	return ResponseEntity.ok(iSupplierService.getDeletedSuppliers());
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
    	} catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }  	
    }
    
    @GetMapping("/contact/{id}")
    public ResponseEntity<ContactModel> getContact(@PathVariable Integer id){
    	return new ResponseEntity<ContactModel>(iContactService.getContactById(id), HttpStatus.OK);
    }
    
    @PostMapping("/contact/add")
    public ResponseEntity<Object> addContact(@Valid @RequestBody ContactModel contact,BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<Object>(iContactService.postContact(contact), HttpStatus.CREATED);
    }
    
    @PutMapping("/contact/edit/{id}")
    public ResponseEntity<Object> editContact(@Valid @RequestBody ContactModel contact,@PathVariable Integer id, BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<Object>(iContactService.editContact(id, contact),HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Object> editSupplier(@PathVariable Integer id, @Valid @RequestBody SupplierModel supplier, BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<Object>(iSupplierService.updateSupplier(id, supplier),HttpStatus.OK);
    }
    
    
}

