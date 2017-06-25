package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Query;

import com.google.gson.JsonElement;
import com.pontua.app.modelo.Cliente;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.JPAUtil;

public class ClienteDAO {
	
	EntityManager em;
	
	public ClienteDAO(){
		this.em = new JPAUtil().getEntityManager();
	}
	
	public boolean adiciona(Cliente cliente) {
		try{
		        this.em.getTransaction().begin();
		        this.em.persist(cliente);
		        this.em.getTransaction().commit();
		        this.em.close();
				return true;
			}catch(PersistenceException e){
				return false;
			}
		}
	
	 public Boolean getLogin(Cliente cliente) {
		 	Query query = this.em.createQuery("select c"
		 								+ " from Cliente c "
		 							   + " where c.email = ?" 
		 							     + " and c.senha = ? " 
		 			).setParameter(0,  cliente.getEmail())
		 			 .setParameter(1,  cliente.getSenha())
		 			 .setMaxResults(1);
		 	List<Cliente> clienteList = (List<Cliente>) query.getResultList();
	        if (clienteList.size() > 0) {
	        	this.em.close();
	        	System.out.println("usuario existe");
	   		 	return true;
	            
	        }
	        this.em.close();
	        System.out.println("usuario NAO existe");
	        return false;	        
	 }
	 
	 public Cliente getClienteEmail(String email){
		 	Query query = this.em.createQuery("select c"
		 								+ " from Cliente c "
		 							   + " where c.email = ?" 
		 				).setParameter(0, email)
		 				 .setMaxResults(1);
		 	Cliente clienteList = (Cliente) query.getSingleResult();
		 	this.em.close();
		 	return clienteList;
	 }

	public Cliente getDadosCliente(String email) {
	 	Query query =this.em.createQuery("select c"
	 								+ " from Cliente c "
	 							   + " where c.email = ?" 
	 				).setParameter(0, email)
	 				 .setMaxResults(1);
	 	Cliente cliente = (Cliente) query.getSingleResult();
	 	this.em.close();
	 	return cliente;
	}
}
