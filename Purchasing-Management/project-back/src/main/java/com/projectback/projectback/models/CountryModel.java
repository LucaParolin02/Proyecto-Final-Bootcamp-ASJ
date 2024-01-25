package com.projectback.projectback.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "countries")
public class CountryModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "country_id")
	private Integer id;
	@Column(name = "count_name", unique = true)
	private String name;
	@OneToMany(mappedBy = "country")
	private List<ProvinceModel> provinces;
	
	public CountryModel() {

	}

	public CountryModel(Integer id, String name) {
		this.id = id;
		this.name = name;
		this.provinces = new ArrayList<ProvinceModel>();
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<ProvinceModel> getProvinces() {
		return provinces;
	}	

	
}
