package com.zentry.api.controller;

import com.zentry.api.dto.CategoriaDto;
import com.zentry.api.dto.SubCategoriaDto;
import com.zentry.api.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/categoria")
@RequiredArgsConstructor
@RestController
public class CategoriaController {
    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<?> getCategoria() {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.list());
    }

    @GetMapping("/page")
    public ResponseEntity<?> getSubCategoriaPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "nombre") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String nombre
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.listFiltro(page, size, sortBy, direction, nombre));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoriaById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.findById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveCategoria(@RequestBody CategoriaDto categoriaDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.save(categoriaDto));
    }
    @PutMapping
    public ResponseEntity<?> updateCategoria(@RequestBody CategoriaDto categoriaDto){
        return ResponseEntity.status(HttpStatus.OK).body(categoriaService.update(categoriaDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategoria(@PathVariable Long id){
        Map<String, Object> mapper = new HashMap<>();
        mapper.put("message", categoriaService.deleteById(id));
        return ResponseEntity.status(HttpStatus.OK).body(mapper);
    }
}
