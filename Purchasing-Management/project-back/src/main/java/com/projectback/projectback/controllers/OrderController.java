package com.projectback.projectback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectback.projectback.models.StatusModel;
import com.projectback.projectback.services.IStatusService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	IStatusService iStatusService;
	
	@GetMapping("/status")
	public ResponseEntity<List<StatusModel>> getAllStatus(){
		return ResponseEntity.ok(iStatusService.getStatus());
	}
	
	@PostMapping("/status/add")
	public ResponseEntity<StatusModel> psotStatus(@Valid @RequestBody StatusModel status){
		return ResponseEntity.ok(iStatusService.addStatus(status));
	}

}
