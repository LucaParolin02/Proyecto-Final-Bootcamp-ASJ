package com.projectback.projectback.models;

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

@Entity
@Table(name = "cities")
public class CityModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "city_id")
	private Integer id;
	@Column(name= "city_name")
	private String name;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "province_id",referencedColumnName = "province_id")
	private ProvinceModel province;
	@OneToMany(mappedBy = "city")
	private List<SupplierModel> suppliers;
	
	public CityModel() {
	}
	
	public CityModel(Integer id,String name,ProvinceModel province) {
		this.id = id;
		this.name = name;
		this.province = province;
		this.suppliers = new ArrayList<SupplierModel>();
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public ProvinceModel getProvince() {
		return province;
	}

	public List<SupplierModel> getSuppliers() {
		return suppliers;
	}
	
	
}
