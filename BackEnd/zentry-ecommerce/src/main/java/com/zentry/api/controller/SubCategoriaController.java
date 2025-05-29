package com.zentry.api.controller;

import com.zentry.api.dto.EstadoPagoDto;
import com.zentry.api.dto.SubCategoriaDto;
import com.zentry.api.service.SubCategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("subCategoria")
@RestController
@RequiredArgsConstructor
public class SubCategoriaController {
    private final SubCategoriaService subCategoriaService;

    @GetMapping
    public ResponseEntity<?> getSubCategoria() {
        return ResponseEntity.status(HttpStatus.OK).body(subCategoriaService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getSubCategoriaPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(subCategoriaService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getSubCategoriaById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(subCategoriaService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveSubCategoria(@RequestBody SubCategoriaDto subCategoriaDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(subCategoriaService.save(subCategoriaDto));
    }
    @PutMapping
    public ResponseEntity<?> updateSubCategoria(@RequestBody SubCategoriaDto subCategoriaDto){
        return ResponseEntity.status(HttpStatus.OK).body(subCategoriaService.update(subCategoriaDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubCategoria(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", subCategoriaService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
