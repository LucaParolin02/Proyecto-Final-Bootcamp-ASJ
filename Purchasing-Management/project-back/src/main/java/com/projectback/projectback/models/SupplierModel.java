package com.projectback.projectback.models;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "suppliers")
public class SupplierModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "supplier_id")
	private Integer id;
	@Column(name="supp_code", unique = true)
	private String code;
	@Column(name="supp_logo")
	private String logo;
	@Column(name="supp_name", unique = true)
	private String name;
	@Column(name="supp_cuit",unique = true)
	@Pattern(regexp = "\\d+", message = "CUIT must contain only numbers")
	private String cuit;
	@Column(name="web")
	private String web;
	@Column(name = "email", unique = true)
	@Email(message = "Must be a valid email address")
	private String email;
	@Column(name="phone" , unique = true)
	private String phone;
	@Column(name="street")
	private String street;
	@Column(name="snumber")
	private String snumber;
	@Column(name = "zip")
	private String zip;
	@Column(name = "created_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp created;
	@Column(name = "updated_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Timestamp updated;
	@Column(name = "is_deleted")
	private boolean deleted;
	@OneToMany(mappedBy = "supplier")
	@JsonManagedReference
	private List<ProductModel> products;
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vat_id", referencedColumnName = "vat_id")
    private VatModel vatCondition;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "sector_id", referencedColumnName = "sector_id")
	private SectorModel sector;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "city_id", referencedColumnName = "city_id")
	private CityModel city;
	@OneToMany(mappedBy = "supplier")
	@JsonManagedReference
	private List<OrderModel> orders;
	
	public SupplierModel() {
	}
	
	public SupplierModel(Integer id, String code, String logo, String name, String cuit, String web, String email,
	        String phone, String street, String snumber, String zip, Timestamp created, Timestamp updated,
	        boolean deleted, VatModel vatCondition, SectorModel sector, CityModel city) {
	    this.id = id;
	    this.code = code;
	    this.logo = logo;
	    this.name = name;
	    this.cuit = cuit;
	    this.web = web;
	    this.email = email;
	    this.phone = phone;
	    this.street = street;
	    this.snumber = snumber;
	    this.zip = zip;
		this.created = Timestamp.from(Instant.now());
		this.updated = this.created;
		this.deleted = false;
	    this.products = new ArrayList<ProductModel>();
	    this.orders = new ArrayList<OrderModel>();
	    this.vatCondition = vatCondition;
	    this.sector = sector;
	    this.city = city;
	}

	public Integer getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public String getWeb() {
		return web;
	}

	public void setWeb(String web) {
		this.web = web;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getSnumber() {
		return snumber;
	}

	public void setSnumber(String snumber) {
		this.snumber = snumber;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
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

	public List<ProductModel> getProducts() {
		return products;
	}

	public void setProducts(List<ProductModel> products) {
		this.products = products;
	}

	public VatModel getVatCondition() {
		return vatCondition;
	}

	public void setVatCondition(VatModel vatCondition) {
		this.vatCondition = vatCondition;
	}

	public SectorModel getSector() {
		return sector;
	}

	public void setSector(SectorModel sector) {
		this.sector = sector;
	}

	public CityModel getCity() {
		return city;
	}

	public void setCity(CityModel city) {
		this.city = city;
	}
	
	
}
