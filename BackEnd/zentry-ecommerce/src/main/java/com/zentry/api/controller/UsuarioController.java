package com.zentry.api.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.zentry.api.dto.UsuarioDto;
import com.zentry.api.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
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
	@PostMapping
	public ResponseEntity<?> saveDefault(@RequestBody UsuarioDto usuarioDto) {
		usuarioDto.setContraseña(passwordEncoder.encode(usuarioDto.getContraseña()));
		return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.save(usuarioDto));
	}

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
	public ResponseEntity<?> updateUsuario(@RequestBody UsuarioDto usuarioDto){
		usuarioDto.setContraseña(passwordEncoder.encode(usuarioDto.getContraseña()));
		return ResponseEntity.status(HttpStatus.OK).body(usuarioService.update(usuarioDto));
	}
	@GetMapping("/session")
	public ResponseEntity<?> getPerfilUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> mapeo = new HashMap<>();
		mapeo.put("User", authentication.getPrincipal());
        return ResponseEntity.status(HttpStatus.OK).body(mapeo);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUsuario(@PathVariable Long id){
		String mensaje = usuarioService.delete(id);
		Map<String, Object> mapper = new HashMap<>();
		mapper.put("message", mensaje);
		return ResponseEntity.status(200).body(mapper);
	}
}
