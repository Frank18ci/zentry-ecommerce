package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import com.zentry.api.dto.ColorDto;
import com.zentry.api.dto.ProductoDto;
import com.zentry.api.dto.TallaDto;
import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Color;
import com.zentry.api.service.ColorService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.ProductoVarianteDto;
import com.zentry.api.model.ProductoVariante;
import com.zentry.api.repository.ProductoVarianteRepository;
import com.zentry.api.service.ProductoVarianteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoVarianteServiceImpl implements ProductoVarianteService {

	public final ProductoVarianteRepository productoVarianteRepository;
	public final ColorService colorService;

	@PersistenceContext
	private EntityManager entityManager;
	@Override
	public List<ProductoVarianteDto> list() {
		// TODO Auto-generated method stub
		return ProductoVarianteDto.listProductoVarianteToListProductoVarianteDto(productoVarianteRepository.findAll());
	}

	@Override
	public Page<ProductoVarianteDto> listFiltro(int page, int size, String sortBy, String direction, String producto) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, sortBy);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<ProductoVariante> resultado = productoVarianteRepository.findByProducto_NombreContainingIgnoreCase(direction, pageable);
		return resultado.map(ProductoVarianteDto::productoVarienteToProductoVarienteDto);
	}

	@Override
	public ProductoVarianteDto findById(Long id) {
		// TODO Auto-generated method stub
		return ProductoVarianteDto.productoVarienteToProductoVarienteDto(productoVarianteRepository.findProductoVarianteById(id)
				.orElseThrow(() -> new ResourceNotFound("Producto variante no encontrado con id " + id)));
	}

	/*@Override
	public ProductoVarianteDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public ProductoVarianteDto save(ProductoVarianteDto productoVarianteDTO) {
		return ProductoVarianteDto.productoVarienteToProductoVarienteDto(productoVarianteRepository.save(Objects.requireNonNull(ProductoVarianteDto.productoVarienteDtoToProductoVariente(productoVarianteDTO))));
	}

	@Override
	public ProductoVarianteDto update(ProductoVarianteDto productoVarianteDTO) {
		ProductoVariante productoVariante = productoVarianteRepository.findProductoVarianteById(productoVarianteDTO.getId())
				.orElseThrow(() -> new ResourceNotFound("Producto variante no encontrado con id " + productoVarianteDTO.getId()));
		if(productoVarianteDTO.getProducto() != null){
			productoVariante.setProducto(ProductoDto.productoDtoToProducto(productoVarianteDTO.getProducto()));
		}
		if(productoVarianteDTO.getTalla() != null){
			productoVariante.setTalla(TallaDto.tallaDtoToTalla(productoVarianteDTO.getTalla()));
		}
		if(productoVarianteDTO.getColor() != null){
			Color color = entityManager.getReference(Color.class, productoVarianteDTO.getColor().getId());
			productoVariante.setColor(color);
		}
		productoVariante.setStock(productoVarianteDTO.getStock());
		ProductoVariante productoVarianteSaved = productoVarianteRepository.save(productoVariante);
		return ProductoVarianteDto.productoVarienteToProductoVarienteDto(productoVarianteSaved);
	}

	@Override
	public String delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
