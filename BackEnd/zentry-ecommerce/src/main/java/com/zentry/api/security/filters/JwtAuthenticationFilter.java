package com.zentry.api.security.filters;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zentry.api.model.Usuario;
import com.zentry.api.security.jwt.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	private final JwtUtils jwtUtils;
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		Usuario usuarioEntity;
		try {
			usuarioEntity = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);
		} catch (IOException e) {
			throw new RuntimeException("Error al leer la solicitud de autenticación", e);
		}
		UsernamePasswordAuthenticationToken authenticationToken = 
	            new UsernamePasswordAuthenticationToken(usuarioEntity.getCorreoElectronico(), usuarioEntity.getContraseña());
	    return getAuthenticationManager().authenticate(authenticationToken);
	}
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
	    UserDetails userDetails = (UserDetails) authResult.getPrincipal();
	    String token = jwtUtils.generateAccesToken(userDetails.getUsername());

	    response.addHeader("Authorization", "Bearer " + token);

	    Map<String, Object> httpResponse = new HashMap<>();
	    httpResponse.put("token", token);
	    httpResponse.put("Message", "Authentication success");
	    httpResponse.put("User", userDetails);

	    response.setStatus(HttpStatus.OK.value());
	    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
	    response.getWriter().write(new ObjectMapper().writeValueAsString(httpResponse));
	    response.getWriter().flush();

	}
}
