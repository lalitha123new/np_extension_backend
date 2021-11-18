/**
 * Repository for accessing the data in the asset_summary table in TrackerDb
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.dao;

import java.util.List;
import javax.persistence.EntityManager;

import org.hibernate.query.Query;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.nplab.extension.db.AssetSummary;
import com.nplab.extension.db.PendingAsset;
import com.nplab.extension.db.RequestCount;

@Repository
public class AssetSummaryDao {
	private EntityManager entityManager;
	
	@Autowired
	public AssetSummaryDao(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	/**
	 *
	 * @param stat (String): The column name in the table where maximum value is to be found
	 * @param criteria (String): Specification for particular entries (such as endTime not being null) from where maximum value is to be found
	 *                 in HQL syntax
	 * @return Maximum value in the stat column from all rows meeting the criteria
	 */
	public int findMax(String stat, String criteria) {
		@SuppressWarnings("unchecked")
		Query<Integer> statQuery = (Query<Integer>) entityManager.createQuery(
				"select max(a." + stat + ") from AssetSummary a where " + criteria 
			);

		if (statQuery.getResultList().get(0) == null) {
			return 0;
		}

		return statQuery.getResultList().get(0);
	}

	/**
	 *
	 * @param stat (String): The column name in the table whose mean has to be found
	 * @param criteria (String): Specification for particular entries (such as endTime not being null) whose mean is to be found in HQL syntax
	 * @return Mean of the stat column of all rows meeting the criteria
	 */
	public double findMean(String stat, String criteria) {
		@SuppressWarnings("unchecked")
		Query<Double> statQuery = (Query<Double>) entityManager.createQuery(
				"select avg(a."+ stat + ") from AssetSummary a where " + criteria
			);

		if (statQuery.getResultList().get(0) == null) {
			return 0;
		}
		return statQuery.getResultList().get(0);
	}

	/**
	 *
	 * @param criteria (String): Specifications of the type of entries (such as endTime being null for pending) in the table to be counted, in HQL syntax
	 * @return Count of entries meeting the criteria
	 */
	public long countByCriteria(String criteria) {
		@SuppressWarnings("unchecked")
		Query<Long> query = (Query<Long>) entityManager
				.createQuery(
					"SELECT COUNT(a.npNumber) FROM AssetSummary a WHERE " + criteria
					);

		return query.getResultList().get(0);
	}

	/**
	 *
	 * @param criteria (String): Specifications of the type of entries (such as biopsy_types) in the table to be counted, in HQL syntax
	 * @param startTime (String): Starting date of the time interval in which entries are counted in the form YYYY-MM-DD
	 * @param endTime (String): Ending date of the time interval in which entries are counted in the form YYYY-MM-DD
	 * @return Count of all entries being processed in a time interval and meeting the criteria passed
	 */
	public long countByDateAndCriteria(String criteria, String startTime, String endTime) {
		@SuppressWarnings("unchecked")
		Query<Long> query = (Query<Long>) entityManager
				.createQuery(
					"SELECT COUNT(a) FROM AssetSummary a WHERE " + criteria +
					" AND a.endTime >= '" + startTime + "' AND a.startTime <= '" + endTime + "'"
					);
		
		return query.getResultList().get(0);
	}

	/**
	 *
	 * @param criteria (String) Specifications for entries (such as biopsy_type, tat range) which have
	 *                    to be grouped by special request types in HQL syntax
	 * @param startTime (String) Starting date in the time interval, where assets are grouped
	 *                     by special_requests in the form YYYY-MM-DD
	 * @param endTime (String) Ending date in the time interval, where assets are grouped
	 * 	 *                     by special_requests in the form YYYY-MM-DD
	 * @return List of RequestCount objects containing the name of request and the number of entries
	 *     having that request type. Eg: {requestType = "IHC + Decal", count = 23}
	 */
	public List<RequestCount> findCountByRequestType(String criteria, String startTime, String endTime) {
		@SuppressWarnings("unchecked")
			Query<RequestCount> query = (Query<RequestCount>) entityManager
			.createQuery(
				"SELECT NEW com.nplab.extension.db.RequestCount(a.requestCode, COUNT(a)) " +
				"FROM AssetSummary a WHERE " + 
				"a.endTime >= '" +  startTime + "'" + " AND a.startTime <= '" + endTime +  
				"' AND " + criteria
			);
						
			return query.getResultList();
	}

	/**
	 * @param criteria (String) Specifications for entries (such as tatRange)
	 * @returns List of PendingAsset objects each containing the npNumber, biopsyType and startTime
	 */
	public List<PendingAsset> findPendingAssets(String criteria) {
		String lowLimit = (new DateTime()).minusDays(90).toString().substring(0, 10);
		String upLimit = (new DateTime()).toString().substring(0, 10);
//		System.out.println(currentTime);
		@SuppressWarnings("unchecked")
		Query<PendingAsset> query = (Query<PendingAsset>) entityManager
				.createQuery(
					"SELECT NEW com.nplab.extension.db.PendingAsset(a.npNumber, a.biopsyType, a.startTime) " +
					"FROM AssetSummary a WHERE a.endTime IS NULL AND a.startTime >= '" + lowLimit + "' AND a.startTime < '" + upLimit + "'" + criteria + " ORDER BY a.startTime ASC"
				);

//		System.out.println(query.getResultList().size());
		return query.getResultList();
	}

}
