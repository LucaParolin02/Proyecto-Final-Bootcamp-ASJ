package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectback.projectback.models.StatusModel;
import com.projectback.projectback.repositories.StatusRepository;
import com.projectback.projectback.services.IStatusService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StatusService implements IStatusService {
	
	@Autowired
	StatusRepository statusRepository;

	@Override
	public List<StatusModel> getStatus(){
		return statusRepository.findByDeletedFalse();
	}
	
	@Override
	public StatusModel getStatusById(Integer id) {
		Optional<StatusModel> status = statusRepository.findById(id);
		if(status.isPresent()) {
			return status.get();
		}
		throw new EntityNotFoundException("Status with ID " + id + " not found");
	}
	
	@Override
	public StatusModel addStatus(StatusModel status) {
		status.setCreated(Timestamp.from(Instant.now()));
		status.setUpdated(Timestamp.from(Instant.now()));
		return statusRepository.save(status);
	}
}
