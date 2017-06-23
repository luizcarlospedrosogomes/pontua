package com.pontua.app.DAO;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import com.pontua.app.modelo.Promocao;
import com.pontua.app.modelo.Usuario;
import com.pontua.app.util.JPAUtil;

public class PromocaoDAO {
	
	private Promocao promocao;
	private EntityManager manager;
	private Query query;
	
	public List buscaAll(String role, String email){
		String sql = "FROM Promocao";
		if(role == "representante" || role == "cliente"){
			sql += " WHERE representante = :email";
		}
		if(role.equals("admin")){
			sql += "AND 1 = 1 ";
		}
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		List pro = em.createQuery(sql).setParameter("email", email).getResultList();
		em.getTransaction().commit();
		em.close();
	
		return pro;
	}
	public void atualiza(Promocao promocao, String email){
		String sql = "UPDATE Promocao";
			   sql += " SET nome = :nome,";
			   sql += " quantidade_pontos = :quantidade_pontos,";
			   sql += " status = :status,";
			   sql += " validade = :validade";
			   sql += " WHERE id = :id";
			   sql += " AND representante = :email";
					   
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		Query query = em.createQuery(sql)
				.setParameter("nome", promocao.getNome())
				.setParameter("quantidade_pontos", promocao.getQuantidade_pontos())
				.setParameter("status", promocao.getStatus())
				.setParameter("validade", promocao.getValidade())
				.setParameter("id", promocao.getId())
				.setParameter("email", email);
		query.executeUpdate();
		em.getTransaction().commit();
		em.close();
	
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
	   	EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        em.persist(promocao);
        em.getTransaction().commit();
        em.close();
		System.out.println("adicionou");
	}
	
	public void remover(int id	) {
	   	EntityManager em = new JPAUtil().getEntityManager();
	   	em.getTransaction().begin();
        Query query = em.createQuery("DELETE FROM Promocao where id = ?")
        .setParameter(0, id);
        query.executeUpdate();
        em.getTransaction().commit();
        em.close();
		
	}

	public boolean validaRepresentante(String email, int id) {
		String sql  = "FROM Promocao";
			   sql += " WHERE representante = :email";
			   sql += " AND id = :id";
		EntityManager em = new JPAUtil().getEntityManager();
		em.getTransaction().begin();
		List pro = em.createQuery(sql)
				     .setParameter("email", email)
				     .setParameter("id", id)
				     .getResultList();
		em.getTransaction().commit();
		em.close();
        if (pro.size() > 0)
        	return true;   	
        return false;	        
 
	}
	
}
