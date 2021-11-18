/**
 * Service Class for making calls to all the methods in the service layer as required
 * @author Vaibhavi Lokegaonkar
 */
package com.nplab.extension.dashboard.service;

import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.PendingAsset;
import com.nplab.extension.db.RequestCount;

@Service
public class SampleStatsService {
	private AssetSummaryDao assetSummaryDao;
	private ReportStats reportStats;
	private PendingAssetStats pendingAssetsStats;
	
	private static Map<String, String> summaryCriteria = Map.ofEntries(Map.entry("tat", "a.tat is not null")); 
	
	@Autowired
	public SampleStatsService(AssetSummaryDao assetSummaryDao) {
		this.assetSummaryDao = assetSummaryDao;
		this.reportStats = new ReportStats(assetSummaryDao);
		this.pendingAssetsStats = new PendingAssetStats(assetSummaryDao);
	}

	/**
	 * Calls the findPendingAssets() in PendingAssetStats class
	 * @return List of all pending assets
	 */
	public List<PendingAsset> findPendingAssets() {
		return this.pendingAssetsStats.findPendingAssets();
	}

	/**
	 * Calls the findPendingAssetsCount() in PendingAssetStats class
	 * @return Number of pending assets
	 */
	public long countPendingAssets() {
		return this.pendingAssetsStats.findPendingAssetsCount();
	}

	/**
	 * Calls the respective function in CasesCount class to find number of cases this year
	 * and this month
	 * @param time Time over where the cases are counted eg: month or year
	 * @return Number of cases registered this year or month
	 */
	public long countCasesOverTime(String time) {
		return (time.equals("month")) ? CasesCount.countCurrentMonth(assetSummaryDao)
				: CasesCount.countCurrentYear(assetSummaryDao);
	}

	/**
	 * Calls findPendingAssetBreakoutByTime() in PendingAssetStats to find number of pending cases in
	 * different intervals
	 * @param startDays List of all starting numbers of all the intervals
	 * @param endDays List of all ending numbers of all intervals
	 * @return List of counts of pending cases in all intervals given
	 */
	public List<Long> findPendingAssetsBreakout(List<Integer> startDays, List<Integer> endDays) {
		return this.pendingAssetsStats.findPendingAssetBreakoutByTime(startDays, endDays);
	}

	/**
	 * Calls findPendingAssetBreakoutByTime() in PendingAssetStats to find number of pending cases of a
	 * given type in different intervals
	 * @param type The place where case is registered internally or externally
	 * @param startDays List of all starting numbers of all the intervals
	 * @param endDays List of all ending numbers of all intervals
	 * @return List of counts of pending cases in all intervals given
	 */
	public List<Long> findPendingAssetsBreakout(List<Integer> startDays, List<Integer> endDays,String type) {
		return this.pendingAssetsStats.findPendingAssetBreakoutByTime(startDays, endDays, type);
	}

	/**
	 * Calls findPendingAssetBreakoutByTime() in PendingAssetStats to find number of pending cases of a
	 * given type and parity in different intervals
	 * @param parity The parity of NP number of asset
	 * @param type The place where case is registered internally or externally
	 * @param startDays List of all starting numbers of all the intervals
	 * @param endDays List of all ending numbers of all intervals
	 * @return List of counts of pending cases in all intervals given
	 */
	public List<Long> findPendingAssetsBreakout(List<Integer> startDays, List<Integer> endDays,String type, String parity) {
		return this.pendingAssetsStats.findPendingAssetBreakoutByTime(startDays, endDays, type, parity);
	}

	/**
	 * Calls findPendingCasesByOrigin() in PendingAssetStats to find pending cases of a given type
	 * @param origin The place where case is registered internally or externally
	 * @return List of counts of pending cases in all intervals given
	 */
	public List<PendingAsset> findPendingCasesByOrigin(String origin) {
		return this.pendingAssetsStats.findPendingCasesByOrigin(origin);
	}

	/**
	 * Calls findPendingCasesByOriginAndParity() in PendingAssetStats to find pending cases of a given type and parity
	 * @param origin The place where case is registered internally or externally
	 * @param parity The parity of NP number of asset
	 * @return List of counts of pending cases in all intervals given
	 */
	public List<PendingAsset> findPendingCasesByOriginAndParity(String origin, String parity) {
		return this.pendingAssetsStats.findPendingCasesByOriginAndParity(origin, parity);
	}

	/**
	 * Calls findDailyCount() in CasesCount to find count of all cases on a daily basis for a
	 * certain number of days
	 * @param days Number of days from the present day when count is needed
	 * @return List of CasesCount objects
	 */
	public List<CasesCount> findCasesCount(int days) {
		return CasesCount.findDailyCount(days, assetSummaryDao);
	}

	/**
	 * Returns the data summary of a column name from the last 14 days
	 * @param toSummarize The column name which has to be summarised
	 * @return DataSummary containing the mean and maximum
	 */
	public DataSummary summarizeData(String toSummarize) {
		String startDate = new DateTime().minusDays(14).toString().substring(0, 10);
		String criteria = summaryCriteria.get(toSummarize) + " AND a.startTime >= '" + startDate + "'";

		return new DataSummary(toSummarize, assetSummaryDao, criteria);
	}

	/**
	 * Calls findBreakoutBySampleType() in ReportStats to find number of cases with different biopsy types
	 * in a time interval
	 * @param startTime Starting of the given time interval
	 * @param endTime Ending of the given time interval
	 * @return List of counts of all biopsy type cases
	 */
	public List<Long> findSampleTypeBreakout(String startTime, String endTime) {
		return this.reportStats.findBreakoutBySampleType(startTime, endTime);
	}

	/**
	 * Calls findSampleBreakoutByTat() from ReportStats for a list of number of cases of a certain biopsy type with TAT lying in different
	 * intervals
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param startValues List of start values of the range where TAT of a case should lie to be counted
	 * @param endValues List of end value of the range where TAT of a case should lie to be counted
	 * @return List of numbers of cases of a certain biopsy type whose TAT lies in specified intervals
	 */
	public List<Long> findTatBreakout(String sampleType, List<Integer> startValues, List<Integer> endValues) {
		return this.reportStats.findSampleBreakoutByTat(sampleType, startValues, endValues);
	}

	/**
	 * Calls findTatBreakoutByRequests() from ReportStats for list of numbers of cases of a certain biopsy type, and TAT within a certain
	 * range with different special requests/tests
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param tatStart Start value of the range where TAT of the case should lie to be counted
	 * @param tatEnd End value of the range where TAT of a case should lie to be counted
	 * @return List of numbers of cases of a certain biopsy type, and TAT within a certain range with
	 * different special requests/tests
	 */
	public List<RequestCount> findRequestBreakout(String sampleType, int tatStart, int tatEnd) {
		return this.reportStats.findTatBreakoutByRequests(tatStart, tatEnd, sampleType);
	}

}
