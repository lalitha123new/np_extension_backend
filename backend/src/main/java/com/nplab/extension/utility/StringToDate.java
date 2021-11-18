/**
 * Utility class for date object conversion and preprocessing
 * @author Vaibhavi Lokegaonkar
 */
package com.nplab.extension.utility;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

public class StringToDate {

	/**
	 * Converts a date given as a String in "dd-MM-yyyy" format to a DateTime object
	 * @param date String date to be converted
	 * @return DateTime object of the date passed
	 */
	static final public DateTime convertStringToDateTime(String date) {
		DateTimeFormatter formatter = DateTimeFormat.forPattern("dd-MM-yyyy");
		return formatter.parseDateTime(date);
	}

	/**
	 * Convert data in "dd-MM-yyyy" format to "yyyy-MM-dd" format
	 * @param date String date to be converted
	 * @return String date in "yyyy-MM-dd"
	 */
	public static String preProcessDate(String date) {
		String times[] = date.split("-");
		String finalDate = "";
		for (int i = times.length - 1; i >= 0 ; i --) {
			finalDate += times[i] + "-";
		}
		return finalDate.substring(0, finalDate.length() - 1);
	}
}
