package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.OrderModel;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Integer> {

}
