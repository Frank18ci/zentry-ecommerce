package com.zentry.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
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

import com.zentry.api.dto.OrdenDto;
import com.zentry.api.service.OrdenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orden")
public class OrdenController {
	private final OrdenService ordenService;
	
	@GetMapping
    public ResponseEntity<?> getOrden() {
        return ResponseEntity.status(HttpStatus.OK).body(ordenService.list());
    }
	
	@GetMapping("/page")
    public ResponseEntity<?> getOrdenPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(ordenService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrdenById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(ordenService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveOrdem(@RequestBody OrdenDto ordenDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(ordenService.save(ordenDto));
    }
    @PutMapping
    public ResponseEntity<?> updateOrden(@RequestBody OrdenDto ordenDto){
        return ResponseEntity.status(HttpStatus.OK).body(ordenService.update(ordenDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrden(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", ordenService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
