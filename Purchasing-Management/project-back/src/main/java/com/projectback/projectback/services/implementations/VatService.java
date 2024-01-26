package com.projectback.projectback.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.VatModel;
import com.projectback.projectback.repositories.VatRepository;
import com.projectback.projectback.services.IVatService;

@Service
public class VatService implements IVatService{
	
	@Autowired
	VatRepository vatRepository;
	
	@Override
	public List<VatModel> getVats(){
		return vatRepository.findAll();
	}

}
