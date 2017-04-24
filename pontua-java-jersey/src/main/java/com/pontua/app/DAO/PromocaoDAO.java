package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.pontua.app.modelo.Promocao;
import com.pontua.app.util.JPAUtil;

public class PromocaoDAO {
	
	private Promocao promocao;
	private EntityManager manager;
	private Query query;
	
	public List<Promocao> buscaAll(){
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
        
		List<Promocao> promocao = em.createQuery("FROM " + Promocao.class.getName()).getResultList();
		em.getTransaction().commit();
		em.close();
		return promocao;
	}
	
	public Promocao  buscaId(final int id){
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		Promocao promocao = em.find(Promocao.class, id);
		em.getTransaction().commit();
		em.close();
		return promocao;
	}

	public void adiciona(Promocao promocao) {
	/*	this.promocao.setData_fim(promocao.getData_fim());
    	this.promocao.setData_inicio(promocao.getData_inicio());
    	this.promocao.setEmpresa(promocao.getEmpresa());
    	this.promocao.setPontos(promocao.getPontos());
    	this.promocao.setNome(promocao.getNome());*/
    	EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        em.persist(promocao);
        em.getTransaction().commit();
		System.out.println("adicionou");
	}
}
