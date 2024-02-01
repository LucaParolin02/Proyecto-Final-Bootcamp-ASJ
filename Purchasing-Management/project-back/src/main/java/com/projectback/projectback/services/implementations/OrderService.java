package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectback.projectback.models.OrderModel;
import com.projectback.projectback.repositories.OrderRepository;
import com.projectback.projectback.services.IOrderService;
import com.projectback.projectback.services.IStatusService;
import com.projectback.projectback.services.ISupplierService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderService implements IOrderService {
	
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	IStatusService iStatusService;
	@Autowired
	ISupplierService iSupplierService;
	
	@Override
	public List<OrderModel> getAllOrders(){
		return  orderRepository.findAll();
	}
	
	@Override
	public OrderModel getOrderById(Integer id) {
		Optional<OrderModel> order = orderRepository.findById(id);
		if (order.isPresent()) {
			return order.get();
		}
		throw new EntityNotFoundException("Order with ID " + id + " not found");
	}
	
	@Override
	public OrderModel addOrder(OrderModel order) {
		Integer supplierId = order.getSupplier().getId();
		Integer statusId = order.getStatus().getId();
		iSupplierService.getSupplierById(supplierId);
		iStatusService.getStatusById(statusId);
		order.setCreatedAt(Timestamp.from(Instant.now()));
		order.setUpdated(Timestamp.from(Instant.now()));
		return orderRepository.save(order);
	}
	
	@Override
	public OrderModel deleteOrder(Integer id) {
		OrderModel orderToDelete = getOrderById(id);
		orderToDelete.setDeleted(true);
		return orderRepository.save(orderToDelete);
	}
	
	@Override
	public OrderModel editOrder(Integer id, OrderModel order) {
		OrderModel existingOrder = getOrderById(id);
		existingOrder.setExpected(order.getExpected() != null ? order.getExpected() : existingOrder.getExpected());
		existingOrder.setInfo(order.getInfo() != null ? order.getInfo() : existingOrder.getInfo());
		existingOrder.setStatus(order.getStatus() != null ? order.getStatus() : existingOrder.getStatus());
		if (order.getStatus() != null) {
			Integer statusId = order.getStatus().getId();
			iStatusService.getStatusById(statusId);
			existingOrder.setStatus(order.getStatus());
		}		
		existingOrder.setUpdated(Timestamp.from(Instant.now()));
		return orderRepository.save(existingOrder);
	}
	
}
