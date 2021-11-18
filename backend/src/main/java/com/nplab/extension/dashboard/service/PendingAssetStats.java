/**
 * Service class for all statistics related to pending assets
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.dashboard.service;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.PendingAsset;

public class PendingAssetStats {
	private AssetSummaryDao assetSummaryDao;
	
	public PendingAssetStats(AssetSummaryDao assetSummaryDao) {
		this.assetSummaryDao = assetSummaryDao;
	}
	
	private String generateEvenCriteria() {
		return "a.npNumber LIKE '%0/%' "
				+ "OR a.npNumber LIKE '%2/%' OR a.npNumber LIKE '%4/%' " 
				+ "OR a.npNumber LIKE '%6/%' OR a.npNumber LIKE '%8/%'";
	}
	
	private String generateOddCriteria() {
		return "a.npNumber LIKE '%1/%' "
				+ "OR a.npNumber LIKE '%3/%' OR a.npNumber LIKE '%5/%' " 
				+ "OR a.npNumber LIKE '%7/%' OR a.npNumber LIKE '%9/%'";
	}

	/**
	 * @return List of all pending asset details
	 */
	public List<PendingAsset> findPendingAssets() {
		return this.assetSummaryDao.findPendingAssets("");
	}

	/**
	 * @return Number of pending assets
	 */
	public long findPendingAssetsCount() {
		return this.assetSummaryDao.countByCriteria("a.endTime IS NULL");
	}

	/**
	 * Returns a list of all pending assets which were externally or internally registered, as specified
	 * in the parameter
	 * @param origin The place where case is registered i.e. internal or external
	 * @return List of pending assets
	 */
	public List<PendingAsset> findPendingCasesByOrigin(String origin) {
		String npNumCriteria = (origin.equals("internal")) ? 
				"AND a.npNumber NOT LIKE 'X%'" :  "AND a.npNumber LIKE 'X%'";
		return this.assetSummaryDao.findPendingAssets(npNumCriteria);
	}

	/**
	 * Returns the list of pending cases which were registered either internally
	 * or externally or with an odd or even NP number
	 * @param origin The place where case is registered i.e. internal or external
	 * @param parity Parity of NP number whether odd or even
	 * @return List of pending cases
	 */
	public List<PendingAsset> findPendingCasesByOriginAndParity(String origin, String parity) {
		String npNumCriteria = (origin.equals("internal")) ? 
				"AND a.npNumber NOT LIKE 'X%' AND (" :  "AND a.npNumber LIKE 'X%' AND (";
		npNumCriteria += ((parity.equals("even")) ? generateEvenCriteria() : generateOddCriteria()) + ")";
		return this.assetSummaryDao.findPendingAssets(npNumCriteria);
		
	}

	/**
	 * Returns the list of number of (origin based) pending cases in different time intervals
	 * @param type The place where case is registered i.e. internal or external
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @return List of number of pending cases
	 */
	public List<Long> findPendingAssetBreakoutByTime(List<Integer> startDays, List<Integer> endDays,String type) {
		List<Long> pendingCount = new ArrayList<>();
		DateTime currTime = new DateTime();
		String npNumCriteria = (type == "internal") ? "a.npNumber NOT LIKE 'X%'" : "a.npNumber LIKE 'X%'";
		
		for (int i = 0; i < startDays.size(); i ++) {
			String startTime = currTime.minusDays(startDays.get(i)).toString().substring(0, 10);
			String endTime = currTime.minusDays(endDays.get(i)).toString().substring(0, 10);
			pendingCount.add(assetSummaryDao.countByCriteria("a.endTime IS NULL AND ('" +
					endTime + "' < a.startTime AND a.startTime <= '" + startTime + "') AND " + npNumCriteria));
		}
		
		return pendingCount;
	}

	/**
	 * Returns the list of number of (origin and parity based) pending cases in different time intervals
	 * @param type The place where case is registered i.e. internal or external
	 * @param parity Parity of NP number whether odd or even
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @return List of number of pending cases
	 */
	public List<Long> findPendingAssetBreakoutByTime(List<Integer> startDays, List<Integer> endDays,String type, String parity) {
		List<Long> pendingCount = new ArrayList<>();
		DateTime currTime = new DateTime();
		String npNumCriteria = (type.equals("internal")) ? "a.npNumber NOT LIKE 'X%'" : "a.npNumber LIKE 'X%'";
		String parityCriteria = (parity.equals("even")) ? generateEvenCriteria() : generateOddCriteria();
		
		for (int i = 0; i < startDays.size(); i ++) {
			String startTime = currTime.minusDays(startDays.get(i)).toString().substring(0, 10);
			String endTime = currTime.minusDays(endDays.get(i)).toString().substring(0, 10);
			pendingCount.add(assetSummaryDao.countByCriteria("a.endTime IS NULL AND ('" +
					endTime + "' < a.startTime AND a.startTime <= '" + startTime + "') AND " + npNumCriteria + 
					" AND (" + parityCriteria + ")"));
		}
		
		return pendingCount;
	}

	/**
	 * Returns the list of number of pending cases in different time intervals
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @return List of number of pending cases
	 */
	public List<Long> findPendingAssetBreakoutByTime(List<Integer> startDays, List<Integer> endDays) {

		List<Long> pendingCount = new ArrayList<>();
		DateTime currTime = new DateTime();
		for (int i = 0; i < startDays.size(); i ++) {
			String startTime = currTime.minusDays(startDays.get(i)).toString().substring(0, 10);
			String endTime = currTime.minusDays(endDays.get(i)).toString().substring(0, 10);
			pendingCount.add(assetSummaryDao.countByCriteria("a.endTime IS NULL AND '" +
					endTime + "' <= a.startTime AND a.startTime <= '" + startTime + "'"));
		}
		
		return pendingCount;
	}

}
