package com.projectback.projectback.services.implementations;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectback.projectback.models.OrderDetailModel;
import com.projectback.projectback.repositories.OrderDetailRepository;
import com.projectback.projectback.services.IOrderDetailService;
import com.projectback.projectback.services.IOrderService;
import com.projectback.projectback.services.IProductService;

@Service
public class OrderDetailService implements IOrderDetailService{

	@Autowired
	OrderDetailRepository orderDetailRepository;
	@Autowired
	IProductService iProductService;
	@Autowired
	IOrderService iOrderService;
	
	@Override
	public List<OrderDetailModel> getOrderDetailsByOrder(Integer orderId){
		return orderDetailRepository.findByOrderId(orderId);
	}
		
	@Override
	public OrderDetailModel addOrderDetail(OrderDetailModel orderDetail) {
		Integer orderId = orderDetail.getOrder().getId();
		Integer productId = orderDetail.getProduct().getId();
		iOrderService.getOrderById(orderId);
		iProductService.getProductById(productId);
		orderDetail.setCreated(Timestamp.from(Instant.now()));
		orderDetail.setUpdated(Timestamp.from(Instant.now()));
		return orderDetailRepository.save(orderDetail);
	}
	
	@Override
	public List<OrderDetailModel> addOrderDetails(List<OrderDetailModel> orderDetails) {
		List<OrderDetailModel> createdOrderDetails = new ArrayList<>();
		for (OrderDetailModel details : orderDetails) {
			OrderDetailModel createdOrderDetail =  addOrderDetail(details);
			createdOrderDetails.add(createdOrderDetail);
		}
		return createdOrderDetails;
	}
}
