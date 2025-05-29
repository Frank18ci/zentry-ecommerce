package com.zentry.api.repository;







import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.zentry.api.model.Color;

import java.util.Optional;


public interface ColorRepository extends JpaRepository<Color, Long> {
	Page<Color> findByNombreContaining(String nombre, Pageable pageable);
	Optional<Color> findColorById(Long id);

}
