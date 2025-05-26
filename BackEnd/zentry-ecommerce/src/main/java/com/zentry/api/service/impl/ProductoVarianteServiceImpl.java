package com.zentry.api.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.dto.ProductoVarianteDTO;
import com.zentry.api.model.Producto;
import com.zentry.api.model.ProductoVariante;
import com.zentry.api.repository.ColorRepository;
import com.zentry.api.repository.ProductoRepository;
import com.zentry.api.repository.ProductoVarianteRepository;
import com.zentry.api.repository.TallaRepository;
import com.zentry.api.service.ProductoVarianteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoVarianteServiceImpl implements ProductoVarianteService {

	public final ProductoVarianteRepository productoVarianteRepository;
	
	@Override
	public List<ProductoVarianteDTO> list() {
		// TODO Auto-generated method stub
		return ProductoVarianteDTO.listProductoVarianteToListProductoVarianteDto(productoVarianteRepository.findAll());
	}

	@Override
	public Page<ProductoVarianteDTO> listFiltro(int page, int size, String direction, String producto) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, producto);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<ProductoVariante> resultado = productoVarianteRepository.findByProducto_NombreContainingIgnoreCase(direction, pageable);
		return resultado.map(ProductoVarianteDTO::productoVarienteToProductoVarienteDto);
	}

	@Override
	public ProductoVarianteDTO findById(Long id) {
		// TODO Auto-generated method stub
		return ProductoVarianteDTO.productoVarienteToProductoVarienteDto(productoVarianteRepository.findProductoVarianteById(id));
	}

	/*@Override
	public ProductoVarianteDTO findByAll(Long id) {
		// TODO Auto-generated method stub
		return null;
	}*/

	@Override
	public ProductoVarianteDTO save(ProductoVarianteDTO productoVarianteDTO) {
		return ProductoVarianteDTO.productoVarienteToProductoVarienteDto(productoVarianteRepository.save(Objects.requireNonNull(ProductoVarianteDTO.productoVarienteDtoToProductoVariente(productoVarianteDTO))));
	}

	@Override
	public ProductoVarianteDTO update(ProductoVarianteDTO productoVarianteDTO) {
		// TODO Auto-generated method stub
		return save(productoVarianteDTO);
	}

	@Override
	public String delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
