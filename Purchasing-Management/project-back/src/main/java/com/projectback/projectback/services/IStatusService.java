package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.StatusModel;

public interface IStatusService {

	List<StatusModel> getStatus();
	StatusModel getStatusById(Integer id);
	StatusModel addStatus(StatusModel status);
}
