package com.pontua.app.teste;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Conta;
import com.pontua.app.modelo.Promocao;
import com.pontua.app.util.JPAUtil;

public class TesteBusca {
	private Promocao promocao;
	private EntityManager manager;
	private Query query;
	
	public static void main(String[] args) {

		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
        
		List<Promocao> promocao = em.createQuery("FROM " + Promocao.class.getName()).getResultList();
         for (Promocao m : promocao) {
             System.out.println("Descricao: " + m.getNome());
             System.out.println("Conta.id:" + m.getPontos());
         }
		em.getTransaction().commit();
		em.close();
	}

	

  /*  for (Movimentacao m : movimentacoes) {
        System.out.println("Descricao: " + m.getDescricao());
        System.out.println("Conta.id:" + m.getValor());
    }*/
}
