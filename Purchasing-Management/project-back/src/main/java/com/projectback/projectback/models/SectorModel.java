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
@Table(name = "sectors")
public class SectorModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sector_id")
	private Integer id;
	@Column(name = "sector_name")
	@NotBlank(message = "Sector name cannot be empty")
	@Size(max = 30, message = "Sector name must not exceed 30 characters")
	@NotNull(message = "Sector name cannot be null")
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
	@OneToMany(mappedBy = "sector")
	private List<SupplierModel> suppliers;

    public SectorModel() {
	}

	public SectorModel(Integer id, String name) {
		this.id = id;
		this.name = name;
		this.created = Timestamp.from(Instant.now());
		this.updated = this.created;
		this.deleted = false;
		this.suppliers = new ArrayList<SupplierModel>();
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
