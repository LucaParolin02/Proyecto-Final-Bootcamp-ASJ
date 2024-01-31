package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.VatModel;

public interface IVatService {

	List<VatModel> getVats();
	VatModel getVatById(Integer id);
	VatModel addVat(VatModel vat);
}
