package com.projectback.projectback.models;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class OrderModel {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Integer id;
    @Column(name = "order_created")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date created;
    @Column(name = "order_expected")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date expected;
	@Column(name = "order_info", length = 1024)
	private String info;
	@Column(name = "order_total")
	private double total;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp createdAt;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	@Column(name = "is_deleted")
	private boolean deleted;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplier_id")
	private SupplierModel supplier;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private StatusModel status;
	
	public OrderModel() {
	}
	
	public OrderModel(Integer id, Date created, Date expected, String info, double total, Timestamp createdAt,
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
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getExpected() {
		return expected;
	}

	public void setExpected(Date expected) {
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

	public StatusModel getStatus() {
		return status;
	}

	public void setStatus(StatusModel status) {
		this.status = status;
	}
	
	

}
