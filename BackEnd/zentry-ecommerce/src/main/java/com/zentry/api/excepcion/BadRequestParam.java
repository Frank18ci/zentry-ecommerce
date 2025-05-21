package com.zentry.api.excepcion;

public class BadRequestParam extends RuntimeException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BadRequestParam(String mensaje) {
		super(mensaje);
	}
}
