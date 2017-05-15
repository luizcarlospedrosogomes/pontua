package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.JPAUtil;

public class UsuarioDAO {
	
	public void adiciona(Usuario usuario) {
			EntityManager em = new JPAUtil().getEntityManager();
	        em.getTransaction().begin();
	        em.persist(usuario);
	        em.getTransaction().commit();
	        em.close();
			
		}
	
	 public Boolean getLogin(Usuario usuario) {
		 System.out.println("Classe: UsuarioDAO - metodo: getLogin");
		 System.out.println(usuario.getEmail());
		 	EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select u"
		 								+ " from Usuario u "
		 							   + " where u.email = ?" 
		 							     + " and u.senha = ? " 
		 			).setParameter(0,  usuario.getEmail())
		 			 .setParameter(1,  usuario.getSenha())
		 			 .setMaxResults(1);
		 	List<Usuario> usuariolist = (List<Usuario>) query.getResultList();
	        if (usuariolist.size() > 0) {
	        	em.close();
	        	System.out.println("Classe: UsuarioDAO - metodo: getLogin - usuario existe");
	   		 	return true;
	            
	        }
	        em.close();
	        System.out.println("Classe: UsuarioDAO - metodo: getLogin - usuario nao existe");
	        return false;	        
	 }
	 
	 public Usuario getUsuarioEmail(String email){
			EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select u"
		 								+ " from Usuario u "
		 							   + " where u.email = ?" 
		 				).setParameter(0, email)
		 				 .setMaxResults(1);
		 	Usuario usuariolist = (Usuario) query.getSingleResult();
		 	em.close();
		 	return usuariolist;
	 }
}
