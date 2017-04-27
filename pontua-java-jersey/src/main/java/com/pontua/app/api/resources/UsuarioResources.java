package com.pontua.app.api.resources;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Usuario;

@Path("usuario")
public class UsuarioResources {

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public String casdatro(String conteudo){
		Usuario usuario = (Usuario) new Gson().fromJson(conteudo, Usuario.class);
		new UsuarioDAO().adiciona(usuario);
		return new Gson().toJson("Cadastrado com sucesso");
	}
}
