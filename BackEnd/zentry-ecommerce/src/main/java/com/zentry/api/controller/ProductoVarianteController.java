package com.zentry.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zentry.api.dto.ProductoVarianteDto;
import com.zentry.api.service.ProductoVarianteService;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/productoVariante")
public class ProductoVarianteController {
	@Autowired
	private  ProductoVarianteService productoVarianteService;
	
	@GetMapping
	public ResponseEntity<?> getAll() {
		return ResponseEntity.status(200).body(productoVarianteService.list());
	} 
	@GetMapping("/page")
	public ResponseEntity<?> getProductoPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "nombre") String sortBy,
			@RequestParam(defaultValue = "asc") String direction,
			@RequestParam String producto
			) {
		return ResponseEntity.status(200).body(productoVarianteService.listFiltro(page, size, direction, sortBy, producto));
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getTarjetaByNumero(@PathVariable Long id) {
		return ResponseEntity.status(200).body(productoVarianteService.findById(id));
	}
	@PostMapping
	public ResponseEntity<?> createProductoVariante(@RequestBody ProductoVarianteDto productoVarianteDTO  ){
		ProductoVarianteDto u = productoVarianteService.save(productoVarianteDTO);
		return ResponseEntity.status(201).body(u);
	}
	@PutMapping
	public ResponseEntity<?> updateProductoVariante(@RequestBody ProductoVarianteDto productoVarianteDTO){
		ProductoVarianteDto u = productoVarianteService.update(productoVarianteDTO);
		return ResponseEntity.status(200).body(u);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProductoVariante(@PathVariable Long id){
		String mensaje = productoVarianteService.delete(id);
		Map<String, Object> mapper = new HashMap<>();
		mapper.put("message", mensaje);
		return ResponseEntity.status(200).body(mapper);
	}
	
}
