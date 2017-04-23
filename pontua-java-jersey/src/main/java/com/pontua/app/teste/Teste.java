package com.pontua.app.teste;


import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.pontua.app.modelo.Promocao;

public class Teste {

    public static void main(String[] args) {

        /*Conta conta = new Conta();
        conta.setTitular("Leonardo");
        conta.setBanco("Caixa Economica");
        conta.setAgencia("123");
        conta.setNumero("456");*/
    	
    	Promocao promocao = new Promocao();	
    	promocao.setData_fim("30/06/2018");
    	promocao.setData_inicio("30/04/2017");
    	promocao.setEmpresa(1);
    	promocao.setPontos("120");
    	promocao.setNome("Funcionando busca");
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("financas");
        EntityManager em = emf.createEntityManager();

        em.getTransaction().begin();
        em.persist(promocao);
        em.getTransaction().commit();

        emf.close();
    }
}
