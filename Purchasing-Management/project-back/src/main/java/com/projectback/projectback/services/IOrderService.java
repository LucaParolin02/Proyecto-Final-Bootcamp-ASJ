package com.projectback.projectback.services;

import java.util.List;

import com.projectback.projectback.models.OrderModel;

public interface IOrderService {
	
	List<OrderModel> getAllOrders();
	OrderModel getOrderById(Integer id);
	OrderModel addOrder(OrderModel order);
	OrderModel deleteOrder(Integer id);
	OrderModel editOrder(Integer id,OrderModel order);
}
