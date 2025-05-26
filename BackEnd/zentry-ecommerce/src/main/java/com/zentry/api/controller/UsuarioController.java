package com.zentry.api.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zentry.api.dto.UsuarioDto;
import com.zentry.api.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("usuario")
public class UsuarioController {
	private final UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity<?> getAll() {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.list());
	}
	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.find(id));
	}
	
	private final PasswordEncoder passwordEncoder;
	@PostMapping("/saveCliente")
	public ResponseEntity<?> save(@RequestBody UsuarioDto usuarioDto) {
		usuarioDto.setContraseña(passwordEncoder.encode(usuarioDto.getContraseña()));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.saveCliente(usuarioDto));
	}
	@PostMapping("/saveAdmin")
	public ResponseEntity<?> update(@RequestBody UsuarioDto usuarioDto) {
		usuarioDto.setContraseña(passwordEncoder.encode(usuarioDto.getContraseña()));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.saveAdmin(usuarioDto));
	}
	@PutMapping
	public ResponseEntity<?> updateTarjeta(@RequestBody UsuarioDto usuarioDto){
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.update(usuarioDto));
	}
	@GetMapping("/session")
	public ResponseEntity<?> getPerfilUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> mapeo = new HashMap<>();
		mapeo.put("User", authentication.getPrincipal());
        return ResponseEntity.status(HttpStatus.OK).body(mapeo);
	}
}
