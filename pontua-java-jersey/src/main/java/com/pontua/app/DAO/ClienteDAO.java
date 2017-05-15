package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Cliente;
import com.pontua.app.util.JPAUtil;

public class ClienteDAO {
	
	public void adiciona(Cliente cliente) {
			EntityManager em = new JPAUtil().getEntityManager();
	        em.getTransaction().begin();
	        em.persist(cliente);
	        em.getTransaction().commit();
	        em.close();
			
		}
	
	 public Boolean getLogin(Cliente cliente) {
		 	EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select c"
		 								+ " from Cliente c "
		 							   + " where c.email = ?" 
		 							     + " and c.senha = ? " 
		 			).setParameter(0,  cliente.getEmail())
		 			 .setParameter(1,  cliente.getSenha())
		 			 .setMaxResults(1);
		 	List<Cliente> clienteList = (List<Cliente>) query.getResultList();
	        if (clienteList.size() > 0) {
	        	em.close();
	        	System.out.println("Classe: UsuarioDAO - metodo: getLogin - usuario existe");
	   		 	return true;
	            
	        }
	        em.close();
	        System.out.println("Classe: UsuarioDAO - metodo: getLogin - usuario nao existe");
	        return false;	        
	 }
	 
	 public Cliente getClienteEmail(String email){
			EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select c"
		 								+ " from Cliente c "
		 							   + " where c.email = ?" 
		 				).setParameter(0, email)
		 				 .setMaxResults(1);
		 	Cliente clienteList = (Cliente) query.getSingleResult();
		 	em.close();
		 	return clienteList;
	 }
}
