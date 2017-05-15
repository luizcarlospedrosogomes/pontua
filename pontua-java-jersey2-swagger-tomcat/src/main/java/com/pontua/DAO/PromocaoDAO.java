package com.pontua.DAO;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.modelo.Pet;
import com.pontua.modelo.Promocao;
import com.pontua.util.JPAUtil;

public class PromocaoDAO {

	public List buscaAll(){
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
        
		List pro = em.createQuery("FROM " + Promocao.class.getName()).getResultList();
		//em.getTransaction().commit();
		em.close();
	
		return pro;
	}
	
	public Promocao  buscaId(final int id){
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		Promocao promocao = em.find(Promocao.class, id);
		//em.getTransaction().commit();
		em.close();
		System.out.println("busca por id");
		return promocao;
	}

	public void adiciona(Promocao promocao) {
	   	EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        em.persist(promocao);
        em.getTransaction().commit();
        em.close();
		System.out.println("adicionou");
	}
}
