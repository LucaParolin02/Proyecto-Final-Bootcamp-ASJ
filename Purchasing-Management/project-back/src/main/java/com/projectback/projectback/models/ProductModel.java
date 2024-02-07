package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.time.Instant;
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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="products")
public class ProductModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer id;
	@Column(name = "sku",unique = true)
	@NotBlank(message = "Sku cannot be blank")
	@NotNull(message = "Sku cannot be null")
	@Size(max = 50, message = "Sku must be less than {max} characters")
	private String sku;
	@Column(name = "prod_name",length = 20)
	@NotBlank(message = "Product name cannot be blank")
	@NotNull(message = "Product name cannot be null")
	@Size(max = 20 , message = "Product name must be less than {max} characters")
	private String name;
	@Column(name = "prod_desc", length = 255)
	@NotBlank(message = "Description cannot be blank")
	@Size(max = 255, message = "Description must be less than {max} characters")
	private String desc;
	@Column(name = "prod_price")
	@NotNull(message = "Price cannot be null")
	@Positive(message = "Price must be a positive value")
	private Double price;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp created;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	@Column(name = "is_deleted")
	private boolean deleted;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplier_id")
	private SupplierModel supplier;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "category_id", referencedColumnName = "category_id")
	private CategoryModel category;
	
	public ProductModel() {
	}
	
    public ProductModel(Integer id, String sku, String name, String desc, double price,
            Timestamp created, Timestamp updated, boolean deleted, SupplierModel supplier, CategoryModel category) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.desc = desc;
        this.price = price;
		this.created = Timestamp.from(Instant.now());
		this.updated = this.created;
		this.deleted = false;
        this.supplier = supplier;
        this.category = category;
    }

	public Integer getId() {
		return id;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
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

	public SupplierModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierModel supplier) {
		this.supplier = supplier;
	}

	public CategoryModel getCategory() {
		return category;
	}

	public void setCategory(CategoryModel category) {
		this.category = category;
	}

	
    
}
