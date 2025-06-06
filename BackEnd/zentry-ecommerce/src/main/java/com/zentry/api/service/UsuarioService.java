package com.zentry.api.service;

import java.util.List;

import com.zentry.api.dto.UsuarioDto;

public interface UsuarioService {
	public List<UsuarioDto> list();
	public UsuarioDto find(Long id);
	public UsuarioDto saveCliente(UsuarioDto usuarioDto);
	public UsuarioDto save(UsuarioDto usuarioDto);
	public UsuarioDto saveAdmin(UsuarioDto usuarioDto);
	public UsuarioDto update(UsuarioDto usuarioDto);
	public String delete(Long id);
	public UsuarioDto findByUsernameCorreo(String usernameCorreo);
}
