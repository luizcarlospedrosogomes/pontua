package com.pontua.app.api.resources;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.pontua.app.DAO.UsuarioDAO;
import com.pontua.app.modelo.Promocao;
import com.pontua.app.modelo.Usuario;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Path("usuario")
@Api(value="/user", description = "Operations about user")
public class UsuarioResources {

	@POST
    @ApiOperation(value    = "Todas promocoes", 
	  			  notes    = "retorna promoções",
	  			  response = Promocao.class)
    @ApiResponses(value = { @ApiResponse(code = 404, message = "Promocao nao encontrada"),
	@ApiResponse(code = 404, message = "Promocao not found") })

    
	@Produces(MediaType.APPLICATION_JSON)
	public String casdatro(String conteudo){
		Usuario usuario = (Usuario) new Gson().fromJson(conteudo, Usuario.class);
		new UsuarioDAO().adiciona(usuario);
		return new Gson().toJson("Cadastrado com sucesso");
	}
}
