package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.SectorModel;

public interface ISectorService {
	
	List<SectorModel> getSectors();
	List<SectorModel> getDeletedSectors();
	SectorModel postSector(SectorModel sectorModel);
	SectorModel restoreSector(Integer id, SectorModel sector);
	SectorModel deleteSector(Integer id);
	SectorModel getSectorById(Integer id);
	SectorModel editSector(Integer id,SectorModel sectorModel);
}
