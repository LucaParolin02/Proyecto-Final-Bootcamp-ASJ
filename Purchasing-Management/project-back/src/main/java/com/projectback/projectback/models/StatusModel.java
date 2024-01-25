package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "statuses")
public class StatusModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "status_id")
	private Integer id;
	@Column(name = "status_name", unique = true)
	@NotBlank(message = "Status name cannot be empty")
	@Size(max = 20, message = "Status name must not exceed 20 characters")
	@NotNull(message = "Status name cannot be null")
	private String name;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull(message = "Date cannot be null")
	private Timestamp created;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	@Column(name = "is_deleted")
	private boolean deleted;
	@OneToMany(mappedBy = "status")
	private List<OrderModel> orders;
	
	public StatusModel() {
	}
	
	public StatusModel(Integer id,String name) {
		this.id = id;
		this.name = name;
		this.created = Timestamp.from(Instant.now());
		this.updated = this.created;
		this.deleted = false;
		this.orders = new ArrayList<OrderModel>();
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Timestamp getCreated() {
		return created;
	}

	public void setCreated(Timestamp created) {
		this.created = created;
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
	
	
	

}
