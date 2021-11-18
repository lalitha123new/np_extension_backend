/**
 * Repository for loading User credentials from user table in TrackerDb
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.dao;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nplab.extension.db.User;

@Repository
public class UserDao {
	
	private EntityManager entityManager;
	
	@Autowired
	public UserDao(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 * Finds a user with the given username
	 * @param username Username of the user to be searched
	 * @return User having the same username as passed
	 */
	public User findByUsername(String username) {
		Query<User> userQuery = (Query<User>) entityManager
				.createQuery("select u from User u where u.username = :username");
		userQuery.setParameter("username", username);
		return userQuery.getResultList().get(0);
	}

}
