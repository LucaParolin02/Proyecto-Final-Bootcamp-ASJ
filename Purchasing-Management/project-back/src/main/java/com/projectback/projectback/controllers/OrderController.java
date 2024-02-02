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
import com.projectback.projectback.models.OrderDetailModel;
import com.projectback.projectback.models.OrderModel;
import com.projectback.projectback.models.StatusModel;
import com.projectback.projectback.services.IOrderDetailService;
import com.projectback.projectback.services.IOrderService;
import com.projectback.projectback.services.IStatusService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	IStatusService iStatusService;
	@Autowired
	IOrderService iOrderService;
	@Autowired
	IOrderDetailService iOrderDetailService;
	
	@GetMapping("/status")
	public ResponseEntity<List<StatusModel>> getAllStatus(){
		return ResponseEntity.ok(iStatusService.getStatus());
	}
	
	@PostMapping("/status/add")
	public ResponseEntity<StatusModel> postStatus(@Valid @RequestBody StatusModel status){
		return ResponseEntity.ok(iStatusService.addStatus(status));
	}
	
	@GetMapping()
	public ResponseEntity<List<OrderModel>> getOrders(){
		return ResponseEntity.ok(iOrderService.getAllOrders());
	}
	
	@GetMapping("/deleted")
	public ResponseEntity<List<OrderModel>> getDeletedOrders(){
		return ResponseEntity.ok(iOrderService.getDeletedOrders());
	}
	
	@PostMapping("/add")
	public ResponseEntity<Object> addOrder(@Valid @RequestBody OrderModel order, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
			return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iOrderService.addOrder(order), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteOrder(@PathVariable Integer id){
		try { 
			return new ResponseEntity<Object>(iOrderService.deleteOrder(id), HttpStatus.NO_CONTENT);
		} catch (EntityNotFoundException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (OperationNotAllowedException e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<Object>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> editOrder(@PathVariable Integer id,@Valid @RequestBody OrderModel order, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iOrderService.editOrder(id, order), HttpStatus.OK);
	}
	
	@GetMapping("/details/{id}")
	public ResponseEntity<List<OrderDetailModel>> getDetails(@PathVariable Integer id){
		return ResponseEntity.ok(iOrderDetailService.getOrderDetailsByOrder(id));
	}
	
	@PostMapping("/details/add")
	public ResponseEntity<Object> addDetail(@Valid @RequestBody OrderDetailModel orderDetail, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			Map<String, String> errors = new ErrorsInputs().validacionInputs(bindingResult);
    		return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<Object>(iOrderDetailService.addOrderDetail(orderDetail), HttpStatus.CREATED);
	}
}
