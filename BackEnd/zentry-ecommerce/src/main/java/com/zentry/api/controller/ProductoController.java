package com.zentry.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zentry.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("producto")
public class ProductoController {
	private final ProductoService productoService;
	
	@GetMapping
	public ResponseEntity<?> getUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(productoService.list());
	}
	
	@GetMapping("/page")
	public ResponseEntity<?> getUsersPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "nombre") String sortBy,
			@RequestParam(defaultValue = "asc") String direction,
			@RequestParam(defaultValue = "") String nombre
			) {
		return ResponseEntity.status(HttpStatus.OK).body(productoService.listFiltro(page, size, sortBy, direction, nombre));
	}
	
	
}
