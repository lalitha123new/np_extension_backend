/**
 * DB class for collecting pending asset details (np_number, biopsy_type, start_date) from the query results
 * Contains getters, setters and overridden toString()
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.db;

import com.nplab.extension.utility.StringToDate;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;

public class PendingAsset {
	private String npNumber;
	private String biopsyType;
	private String startTime;

	@Autowired
	public PendingAsset(String npNumber, String biopsyType, DateTime startTime) {
		super();
		this.npNumber = npNumber;
		this.biopsyType = biopsyType;
		DateTime currentInstant = new DateTime();
		// Formatting the start time of the pending asset according to current time instant
		if (startTime.equals(currentInstant)) {
			this.startTime = "Now";
		} else {
			String date = StringToDate.preProcessDate(startTime.toString().substring(0, 10));
			String time = startTime.toString().substring(11, 16);
			String dateToday = StringToDate.preProcessDate((currentInstant).toString().substring(0, 10));
			String dateYesterday = StringToDate.preProcessDate((currentInstant).minusDays(1).toString().substring(0, 10));

			if (date.equals(dateToday)) {
				this.startTime = "Today, " + time;
			} else if (date.equals(dateYesterday)) {
				this.startTime = "Yesterday, " + time;
			} else {
				this.startTime = date + ", " + time;
			}
		}
	}

	public PendingAsset() {
		
	}

	public String getNpNumber() {
		return npNumber;
	}

	public String getBiopsyType() {
		return biopsyType;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setNpNumber(String npNumber) {
		this.npNumber = npNumber;
	}

	public void setBiopsyType(String biopsyType) {
		this.biopsyType = biopsyType;
	}

	public void setStartTime(DateTime startTime) {
		DateTime currentInstant = new DateTime();
		// Formatting the start time of the pending asset according to current time instant
		if (startTime.equals(currentInstant)) {
			this.startTime = "Now";
		} else {
			String date = startTime.toString().substring(0, 10);
			String time = startTime.toString().substring(11, 16);
			String dateToday = (currentInstant).toString().substring(0, 10);
			String dateYesterday = (currentInstant).minusDays(1).toString().substring(0, 10);

			if (date.equals(dateToday)) {
				this.startTime = "Today, " + time;
			} else if (date.equals(dateYesterday)) {
				this.startTime = "Yesterday, " + time;
			} else {
				this.startTime = date + ", " + time;
			}
		}
	}

	@Override
	public String toString() {
		return "PendingAsset [npNumber=" + npNumber + ", biopsyType=" + biopsyType + ", startTime=" + startTime + "]";
	}

}
