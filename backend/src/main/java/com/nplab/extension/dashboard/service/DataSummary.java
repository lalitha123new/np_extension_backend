/**
 * Service class for data summary in terms of mean, maximum
 * @author Vaibhavi Lokagaonkar
 */

package com.nplab.extension.dashboard.service;

import com.nplab.extension.dao.AssetSummaryDao;
import com.nplab.extension.db.AssetSummary;
import org.joda.time.DateTime;

public class DataSummary {
    private String stat;
    private double mean;
    private int max;

    /**
     * Stores the mean and maximum value of the stat given in the parameter
     * @param stat Column name in the asset_summary table which is to be summarised
     * @param assetSummaryDao Data Access Object for asset_summary table in TrackerDb
     * @param criteria Certain condition on the rows of the column to be considered
     */
    public DataSummary(String stat, AssetSummaryDao assetSummaryDao, String criteria) {
        this.stat = stat;
        this.mean = assetSummaryDao.findMean(stat, criteria);
        this.max = assetSummaryDao.findMax(stat, criteria);

    }

	public double getMean() {
		return mean;
	}

	public int getMax() {
		return max;
	}

    @Override
    public String toString() {
        return "DataSummary{" +
                ", mean=" + mean +
                ", max=" + max +
                '}';
    }
}