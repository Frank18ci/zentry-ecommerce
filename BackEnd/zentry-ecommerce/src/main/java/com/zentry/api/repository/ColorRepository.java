package com.zentry.api.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.zentry.api.model.Color;

public interface ColorRepository extends JpaRepository<Color, Long> {
	
}
