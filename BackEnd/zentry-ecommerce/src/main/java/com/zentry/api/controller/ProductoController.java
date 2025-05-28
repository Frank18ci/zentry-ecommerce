package com.zentry.api.controller;

import com.zentry.api.dto.ProductoDto;
import jakarta.websocket.server.PathParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.zentry.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("producto")
public class ProductoController {
	private final ProductoService productoService;
	
	@GetMapping
	public ResponseEntity<?> getProductos() {
		return ResponseEntity.status(HttpStatus.OK).body(productoService.list());
	}
	
	@GetMapping("/page")
	public ResponseEntity<?> getProductoPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "nombre") String sortBy,
			@RequestParam(defaultValue = "asc") String direction,
			@RequestParam(defaultValue = "") String nombre,
			@RequestParam(defaultValue = "0") Long idCategoria,
			@RequestParam(defaultValue = "0") Long idSubCategoria
			) {
		return ResponseEntity.status(HttpStatus.OK).body(productoService.listFiltro(page, size, sortBy, direction, nombre, idCategoria, idSubCategoria));
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getProductoById(@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.OK).body(productoService.findById(id));
	}
	@PostMapping
	public ResponseEntity<?> saveProducto(@RequestBody ProductoDto producto){
		return ResponseEntity.status(HttpStatus.CREATED).body(productoService.saveProducto(producto));
	}
	@PutMapping
	public ResponseEntity<?> updateProducto(@RequestBody ProductoDto producto){
		return ResponseEntity.status(HttpStatus.OK).body(productoService.updateProducto(producto));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProducto(@PathVariable Long id){
		Map<String, Object> mapper = new HashMap<>();
		mapper.put("message", productoService.deleteProductoById(id));
		return ResponseEntity.status(HttpStatus.CREATED).body(mapper);
	}
}
