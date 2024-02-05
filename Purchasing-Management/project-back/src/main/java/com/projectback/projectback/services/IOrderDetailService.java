package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.OrderDetailModel;

public interface IOrderDetailService {
	
	List<OrderDetailModel> getOrderDetailsByOrder(Integer id);
	OrderDetailModel addOrderDetail(OrderDetailModel orderDetail); 
	public List<OrderDetailModel> addOrderDetails(List<OrderDetailModel> orderDetail);
}
