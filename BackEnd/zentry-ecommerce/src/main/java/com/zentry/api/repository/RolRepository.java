package com.zentry.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zentry.api.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long>{
	
}
