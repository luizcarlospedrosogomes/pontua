package com.pontua.app.api.resources;

import javax.ws.rs.Path;

import com.google.gson.Gson;

@Path("login")
public class LoginResource {
	
	public String login(){
		return "logado";
	}
	
	

}
