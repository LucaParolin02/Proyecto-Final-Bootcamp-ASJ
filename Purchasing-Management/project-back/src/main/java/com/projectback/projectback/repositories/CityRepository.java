package com.projectback.projectback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectback.projectback.models.CityModel;

@Repository
public interface CityRepository extends JpaRepository<CityModel, Integer> {

}
