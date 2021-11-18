/**
 * Service class for counting various types of cases based on origin, parity or none
 * @author Vaibhavi Lokagaonkar
 */
package com.nplab.extension.dashboard.service;

import org.joda.time.DateTime;

import com.nplab.extension.dao.AssetSummaryDao;

import java.util.ArrayList;
import java.util.List;

public class CasesCount {
    private long internalCasesCount;
    private long externalCasesCount;

    /**
     * Returns internal and external cases being processed in a given time interval
     * @param to End date of the time interval where cases are counted
     * @param from Start date of the time interval where cases are counted
     * @param assetSummaryDao Data Access Object for asset_summary table in TrackerDb
     */
    public CasesCount(String to, String from, AssetSummaryDao assetSummaryDao) {
        this.internalCasesCount = assetSummaryDao.countByCriteria(
                "a.npNumber not like 'X%' AND a.startTime BETWEEN '"+ from + "' AND '" + to + "'");

        this.externalCasesCount = assetSummaryDao.countByCriteria(
                "a.npNumber like 'X%' AND a.startTime BETWEEN '" +
                        from + "' AND '" + to + "'");
    }

    /**
     * Returns internal and external cases registered each day for the number of days specified
     * @param days Number of days, counting of cases is needed
     * @param assetSummaryDao Data Access Object for asset_summary table in TrackerDb
     * @return List of CasesCount objects
     */
    public static List<CasesCount> findDailyCount(int days, AssetSummaryDao assetSummaryDao) {
        List<CasesCount> casesCount = new ArrayList<>();
        DateTime currentTime = new DateTime();

        for (int i = 1; i <= days; i ++) {
            casesCount.add(new CasesCount(currentTime.minusDays(i - 1).toString().substring(0, 10),
                    currentTime.minusDays(i).toString().substring(0, 10), assetSummaryDao));
        }

        return casesCount;
    }

    /**
     * Returns cases registered this month
     * @param assetSummaryDao Data Access Object for asset_summary table in TrackerDb
     * @return Number of cases registered in the current month
     */
    public static long countCurrentMonth(AssetSummaryDao assetSummaryDao) {
        DateTime today = new DateTime();
        String todayDate = today.toString().substring(0, 10);

        return assetSummaryDao.countByCriteria(
                "a.startTime >= '" + todayDate.substring(0, 7) + "-01'"
                        + " AND a.startTime <= '" + todayDate + "'");
    }

    /**
     * Returns cases registered this year
     * @param assetSummaryDao Data Access Object for asset_summary table in TrackerDb
     * @return Number of cases registered in the current year
     */
    public static long countCurrentYear(AssetSummaryDao assetSummaryDao) {
        DateTime today = new DateTime("2020-02-28");
        String todayDate = today.toString().substring(0, 10);
        return assetSummaryDao.countByCriteria(
                "a.startTime >= '" + todayDate.substring(0,4) + "-01-01'"
                        + " AND a.startTime <= '" + todayDate + "'");
    }

    @Override
    public String toString() {
        return "CasesCount [internalCasesCount=" + internalCasesCount + ", externalCasesCount=" + externalCasesCount
                + "]";
    }

    public long getInternalCasesCount() {
        return internalCasesCount;
    }

    public long getExternalCasesCount() {
        return externalCasesCount;
    }



}
