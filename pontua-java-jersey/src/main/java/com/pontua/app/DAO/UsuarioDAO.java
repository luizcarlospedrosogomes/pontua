package com.pontua.app.DAO;

import java.util.Map;

import javax.persistence.EntityManager;

import com.pontua.app.modelo.EntityNotFoundException;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.JPAUtil;

public class UsuarioDAO {
	private static Map users;
	private Usuario usuario;
	
	public void adiciona(Usuario usuario) {
			EntityManager em = new JPAUtil().getEntityManager();
	        em.getTransaction().begin();
	        em.persist(usuario);
	        em.getTransaction().commit();
	        em.close();
			
		}
	
	 public Usuario getLogin(Long id) throws EntityNotFoundException {
	        System.out.println("id = " + id);
	        System.out.println("users = " + users.keySet());
	        if (users.containsKey(id)) {
	            return (Usuario) users.get(id);
	        }
	        throw new EntityNotFoundException("User Not Found");
	    }
}
