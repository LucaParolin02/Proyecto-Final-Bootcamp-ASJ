package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.SectorModel;

public interface ISectorService {
	
	List<SectorModel> getSectors();
	SectorModel postSector(SectorModel sectorModel);
	SectorModel deleteSector(Integer id);
	SectorModel getSectorById(Integer id);
}
