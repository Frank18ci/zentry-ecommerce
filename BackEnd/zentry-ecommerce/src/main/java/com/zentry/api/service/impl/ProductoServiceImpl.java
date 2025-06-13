package com.zentry.api.service.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.zentry.api.dto.*;
import com.zentry.api.excepcion.BadRequestParam;
import com.zentry.api.model.ComentarioProducto;
import com.zentry.api.model.ImagenProducto;
import com.zentry.api.model.ProductoVariante;
import com.zentry.api.service.ComentarioProductoService;
import com.zentry.api.service.ImagenProductoService;
import com.zentry.api.service.ProductoVarianteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.zentry.api.excepcion.ResourceNotFound;
import com.zentry.api.model.Producto;
import com.zentry.api.repository.ProductoRepository;
import com.zentry.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService{
	
	private final ProductoRepository productoRepository;
	
	@Override
	public List<ProductoListadoDto> list() {
		return ProductoListadoDto.listProductoToListProductoDto(productoRepository.findAll());
	}
	@Override
	public Page<ProductoListadoDto> listFiltro(int page, int size, String sortBy, String direction, String nombre, Long idCategoria, Long idSubCategoria) {
		Direction sortDirection = Direction.ASC;
		if(direction != null && "desc".equalsIgnoreCase(direction.trim())) {
			sortDirection = Direction.DESC;
		}
		Sort sort = Sort.by(sortDirection, sortBy);
		Pageable pageable = PageRequest.of(page, size, sort);
		Page<Producto> pageProducto;
		System.out.println("idCategoria" + idCategoria);
		System.out.println("idSubCategoria" + idSubCategoria);
		if(idCategoria != 0L && idSubCategoria != 0L) {
			System.out.println("condicion 1");
			pageProducto= productoRepository.findProductoByNombreContainingAndSubCategoria_IdAndSubCategoria_Categoria_Id(nombre, idSubCategoria, idCategoria, pageable);
		} else if(idCategoria != 0L){
			System.out.println("condicion 2");
			pageProducto= productoRepository.findProductoByNombreContainingAndSubCategoria_Categoria_Id(nombre, idCategoria, pageable);
		} else if(idSubCategoria != 0L){
			System.out.println("condicion 3");
			pageProducto= productoRepository.findProductoByNombreContainingAndSubCategoria_Id(nombre, idSubCategoria, pageable);
		} else{
			System.out.println("condicion 4");
			pageProducto = productoRepository.findProductosConVariantesAndNombre(nombre, pageable);
		}
		return pageProducto.map(ProductoListadoDto::productoToProductoDTO);
	}
	@Override
	public ProductoListadoDto findById(Long id) {
		return ProductoListadoDto.productoToProductoDTO(productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Producto no encontrado con id" + id)));
	}

	@Override
	public ProductoDto saveProducto(ProductoDto productoDto) {
		Producto producto = ProductoDto.productoDtoToProducto(productoDto);
		producto.setFechaCreacion(new Date());
		Producto productoCreated = productoRepository.save(producto);

		return ProductoDto.productoToProductoDTO(productoCreated);
	}

	@Override
	public ProductoDto updateProducto(ProductoDto productoDto) {
		Producto producto = productoRepository.findById(productoDto.getId())
				.orElseThrow(() -> new ResourceNotFound("Producto no encontrado con id" + productoDto.getId()));
		if(productoDto.getSubCategoria() != null){
			producto.setSubCategoria(SubCategoriaDto.subCategoriaDtoToSubCategoria(productoDto.getSubCategoria()));
		}
		if(productoDto.getEstadoProducto() != null){
			producto.setEstadoProducto(EstadoProductoDto.estadoProductoDtoToEstadoProducto(productoDto.getEstadoProducto()));
		}
		producto.setNombre(productoDto.getNombre());
		producto.setDescripcion(productoDto.getDescripcion());
		producto.setPrecio(productoDto.getPrecio());


		Producto productoUpdated = productoRepository.save(producto);
		return ProductoDto.productoToProductoDTO(productoUpdated);
	}

	private final ComentarioProductoService comentarioProductoService;
	private final ImagenProductoService imagenProductoService;
	private final ProductoVarianteService productoVarianteService;
	@Override
	public String deleteProductoById(Long id) {
		if(id == null){
			throw new BadRequestParam("Falta el dato id");
		}
		Producto producto = productoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFound("Producto no encontrado con id" + id));

		for(ComentarioProducto comentario : producto.getComentarioProductos()){
			comentarioProductoService.deleteById(comentario.getId());
		}
		for(ImagenProducto imagenProducto : producto.getImagenProductos()){
			imagenProductoService.deleteById(imagenProducto.getId());
		}
		for(ProductoVariante productoVariante : producto.getProductoVariantes()){
			productoVarianteService.delete(productoVariante.getId());
		}

		productoRepository.deleteById(id);
		return "Producto con id " + id + " eliminado";
	}
}
