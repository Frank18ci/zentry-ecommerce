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

import com.zentry.api.dto.TallaDTO;
import com.zentry.api.service.TallaService;

@RestController
@RequestMapping("/talla")
public class TallaController {
	@Autowired
	private TallaService tallaService;
	@GetMapping
	public ResponseEntity<?> getAll() {
		return ResponseEntity.status(200).body(tallaService.list());
	}
	@GetMapping("/page")
	public ResponseEntity<?> getTallaPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "asc") String direction,
			@RequestParam String nombre
			) {
		return ResponseEntity.status(200).body(tallaService.listFiltro(page, size, direction,  nombre));
	}
	@GetMapping("/buscar/{id}")
	public ResponseEntity<?> getTallaById(@PathVariable Long numeroTarjeta) {
		return ResponseEntity.status(200).body(tallaService.findById(numeroTarjeta));
	}
	@PostMapping
	public ResponseEntity<?> createProductoVariante(@RequestBody TallaDTO tallaDTO  ){
		TallaDTO u = tallaService.save(tallaDTO);
		return ResponseEntity.status(201).body(u);
	}
	@PutMapping
	public ResponseEntity<?> updateTalla(@RequestBody TallaDTO tallaDTO ){
		TallaDTO u = tallaService.update(tallaDTO);
		return ResponseEntity.status(200).body(u);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTalla(@PathVariable Long id){
		String mensaje = tallaService.delete(id);
		return ResponseEntity.status(200).body(mensaje);
	}
	
}
