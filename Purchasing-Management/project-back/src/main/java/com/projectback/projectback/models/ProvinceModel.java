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
@Table(name = "provinces")
public class ProvinceModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "province_id")
	private Integer id;
	@Column(name = "prov_name")
	private String name;
	@OneToMany(mappedBy = "province")
    private List<CityModel> cities;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", referencedColumnName = "country_id")
    private CountryModel country;
	
	public ProvinceModel() {
	}
	
	public ProvinceModel(Integer id, String name,CountryModel country) {
		this.id = id;
		this.name = name;
		this.country = country;
		this.cities = new ArrayList<CityModel>();
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<CityModel> getCities() {
		return cities;
	}

	public CountryModel getCountry() {
		return country;
	}
	
	
	
}
