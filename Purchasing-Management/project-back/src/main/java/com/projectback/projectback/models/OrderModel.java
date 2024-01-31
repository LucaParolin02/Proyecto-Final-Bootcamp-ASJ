package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "orders")
public class OrderModel {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Integer id;
	@Column(name = "order_created")
	private Timestamp created;
	@Column(name = "order_expected")
	private Timestamp expected;
	@Column(name = "order_info")
	private String info;
	@Column(name = "order_total")
	private double total;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Date cannot be null")
	private Timestamp createdAt;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	@Column(name = "is_deleted")
	private boolean deleted;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplier_id")
	private SupplierModel supplier;
	@OneToMany(mappedBy = "order")
	private List<OrderDetailModel> orderDetails;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private StatusModel status;
	
	public OrderModel() {
	}
	
	public OrderModel(Integer id, Timestamp created, Timestamp expected, String info, double total, Timestamp createdAt,
			Timestamp updated, boolean deleted, SupplierModel supplier,
			StatusModel status) {
		this.id = id;
		this.created = created;
		this.expected = expected;
		this.info = info;
		this.total = total;
		this.createdAt = createdAt;
		this.updated = updated;
		this.deleted = deleted;
		this.supplier = supplier;
		this.orderDetails = new ArrayList<OrderDetailModel>();
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
	}

	public Timestamp getExpected() {
		return expected;
	}

	public void setExpected(Timestamp expected) {
		this.expected = expected;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Timestamp getUpdated() {
		return updated;
	}

	public void setUpdated(Timestamp updated) {
		this.updated = updated;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public SupplierModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierModel supplier) {
		this.supplier = supplier;
	}

	public List<OrderDetailModel> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetailModel> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public StatusModel getStatus() {
		return status;
	}

	public void setStatus(StatusModel status) {
		this.status = status;
	}
	
	

}
