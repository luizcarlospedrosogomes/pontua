package com.pontua.app.util;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.SecurityContext;

public class Role {
	@Context
    Request request;
    
	public static String getRole(SecurityContext securityContext){
		if(securityContext.isUserInRole("representante")){
    		return "representante";
    	}
		if(securityContext.isUserInRole("cliente")){
    		return "cliente";
    	}
		return "-1";
	}
	
}
