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

import com.zentry.api.dto.ColorDTO;
import com.zentry.api.service.ColorService;

@RestController
@RequestMapping("/color")
public class ColorController {
	@Autowired
	private ColorService colorService;
	
	@GetMapping
	public ResponseEntity<?> getAll() {
		return ResponseEntity.status(200).body(colorService.list());
	} 
	@GetMapping("/page")
	public ResponseEntity<?> getColorPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "asc") String direction,
			@RequestParam String Color
			) {
		return ResponseEntity.status(200).body(colorService.listFiltro(page, size, direction,  Color));
	}
	@GetMapping("/buscar/{id}")
	public ResponseEntity<?> getColorById(@PathVariable Long id) {
		return ResponseEntity.status(200).body(colorService.findById(id));
	}
	@PostMapping
	public ResponseEntity<?> createColor(@RequestBody ColorDTO colorDTO  ){
		ColorDTO u = colorService.save(colorDTO);
		return ResponseEntity.status(201).body(u);
	}
	@PutMapping
	public ResponseEntity<?> updateColor(@RequestBody ColorDTO colorDTO){
		ColorDTO u = colorService.update(colorDTO);
		return ResponseEntity.status(200).body(u);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteColor(@PathVariable Long id){
		String mensaje = colorService.delete(id);
		return ResponseEntity.status(200).body(mensaje);
	}
}
