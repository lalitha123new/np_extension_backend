/**
 * Service class for statistics used for report generation
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.dashboard.service;

import java.util.ArrayList;
import java.util.List;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.RequestCount;

public class ReportStats {
	private AssetSummaryDao assetSummaryDao;
	private String startTime;
	private String endTime;
	
	private static List<String> sampleTypes = List.of("Tumor", "Nerve", "Muscle", 
			"Multiple Biopsies", "Epilepsy", "Block", "Slides", "Other");
	
	public ReportStats(AssetSummaryDao assetSummaryDao) {
		this.assetSummaryDao = assetSummaryDao;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	/**
	 * Returns a list of number of cases in a given time interval grouped by different biopsy types
	 * @param startTime Start date of the time interval where cases are counted
	 * @param endTime End date of the time interval where cases are counted
	 * @return List of number of cases grouped by biopsy types
	 */
	public List<Long> findBreakoutBySampleType(String startTime, String endTime) {
		List<Long> sampleTypeCount = new ArrayList<>();
		this.setStartTime(startTime);
		this.setEndTime(endTime);
		for (String sampleType: sampleTypes) {
			sampleTypeCount.add(assetSummaryDao
					.countByDateAndCriteria("a.biopsyType like '%" + sampleType + "%'", this.startTime, this.endTime));
		}
		
		return sampleTypeCount;
	}

	/**
	 * Returns a list of number of cases of a certain biopsy type with TAT lying in different
	 * intervals
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param startValues List of start values of the range where TAT of a case should lie to be counted
	 * @param endValues List of end value of the range where TAT of a case should lie to be counted
	 * @return List of numbers of cases of a certain biopsy type whose TAT lies in specified intervals
	 */
	public List<Long> findSampleBreakoutByTat(String sampleType, List<Integer> startValues, List<Integer> endValues) {
		List<Long> tatTypeCount = new ArrayList<>();
		
		for (int i = 0; i < startValues.size(); i ++) {
			int start = startValues.get(i);
			int end = endValues.get(i);
			tatTypeCount.add(assetSummaryDao
					.countByDateAndCriteria("a.biopsyType like '%" + sampleType + "%' AND " + 
							Integer.toString(start) + " <= a.tat AND a.tat <= " + 
							Integer.toString(end), this.startTime, this.endTime));
		}
		
		return tatTypeCount;
	}

	/**
	 * Returns a list of numbers of cases of a certain biopsy type, and TAT within a certain
	 * range with different special requests/tests
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param tatStart Start value of the range where TAT of the case should lie to be counted
	 * @param tatEnd End value of the range where TAT of a case should lie to be counted
	 * @return List of numbers of cases of a certain biopsy type, and TAT within a certain range with
	 * different special requests/tests
	 */
	public List<RequestCount> findTatBreakoutByRequests(int tatStart, int tatEnd, String sampleType) {
		return this.assetSummaryDao.findCountByRequestType("a.biopsyType like '%" + sampleType + "%' AND " + 
				Integer.toString(tatStart) + " <= a.tat AND a.tat <= " + 
				Integer.toString(tatEnd) + " GROUP BY a.requestCode", startTime, endTime);
	}

}
