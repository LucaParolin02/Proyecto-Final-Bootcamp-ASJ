package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.time.LocalDate;
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
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "orders")
public class OrderModel {
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private Integer id;
    @Column(name = "order_created")
    @NotNull(message = "The created date cannot be null")
    private LocalDate created;
    @Column(name = "order_expected")
    @NotNull(message = "The expected date cannot be null")
    private LocalDate expected;
	@Column(name = "order_info", length = 300)
	@Size(max = 300, message = "The info order cannot be more than 300 characters")
	private String info;
	@Column(name = "order_total")
	@NotNull(message = "Price cannot be null")
	@Positive(message = "Price must be a positive value")
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
	
	public OrderModel(Integer id, LocalDate created, LocalDate expected, String info, double total, Timestamp createdAt,
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

	public LocalDate getCreated() {
		return created;
	}

	public void setCreated(LocalDate created) {
		this.created = created;
	}

	public LocalDate getExpected() {
		return expected;
	}

	public void setExpected(LocalDate expected) {
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
