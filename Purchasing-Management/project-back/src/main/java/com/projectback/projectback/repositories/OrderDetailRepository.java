package com.projectback.projectback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.OrderDetailModel;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, Integer>{

	List<OrderDetailModel> findByOrderId(Integer orderId);
	
}
