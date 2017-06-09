package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Promocao;
import com.pontua.app.modelo.Representante;
import com.pontua.app.util.JPAUtil;

public class RepresentanteDAO {
	
	public void adiciona(Representante representante) {
			EntityManager em = new JPAUtil().getEntityManager();
	        em.getTransaction().begin();
	        em.persist(representante);
	        em.getTransaction().commit();
	        em.close();
			
		}
	
	 public Boolean getLogin(Representante representante) {
		 	EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select r"
		 								+ " from Representante r "
		 							   + " where r.email = ?" 
		 							     + " and r.senha = ? " 
		 			).setParameter(0,  representante.getEmail())
		 			 .setParameter(1,  representante.getSenha())
		 			 .setMaxResults(1);
		 	List<Representante> representanteList = (List<Representante>) query.getResultList();
	        if (representanteList.size() > 0) {
	        	em.close();
	   		 	return true;
	            
	        }
	        em.close();
	        return false;	        
	 }
	 
	 public Representante getRepresentanteEmail(String email){
			EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("select r"
		 								+ " from Representante r "
		 							   + " where r.email = ?" 
		 				).setParameter(0, email)
		 				 .setMaxResults(1);
		 	Representante representateList = (Representante) query.getSingleResult();
		 	em.close();
		 	return representateList;
	 }
	 public List getRepresentante(){
			EntityManager em = new JPAUtil().getEntityManager();
		 	Query query = em.createQuery("FROM " + Representante.class.getName() );
		 
		 	List representateList =  query.getResultList();;
		 	em.close();
		 	return representateList;
	 }
}
