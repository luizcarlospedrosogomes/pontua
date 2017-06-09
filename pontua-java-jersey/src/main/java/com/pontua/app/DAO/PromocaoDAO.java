package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Promocao;
import com.pontua.app.util.JPAUtil;

public class PromocaoDAO {
	
	private Promocao promocao;
	private EntityManager manager;
	private Query query;
	
	public List buscaAll(){
		EntityManager em = new JPAUtil().getEntityManager();
		List pro = em.createQuery("FROM " + Promocao.class.getName()).getResultList();
		em.close();
	
		return pro;
	}
	
	public Promocao  buscaId(final int id){
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		Promocao promocao = em.find(Promocao.class, id);
		em.close();
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
