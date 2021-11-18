/**
 * DB class for collecting number of cases in specific request types from the query results
 * Contains getters, setters and overridden toString()
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.db;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

public class RequestCount {
	private String requestType;
	private long count;
	
	@Autowired
	public RequestCount(String requestType, long count) {
		List<String> requestTypes = List.of("Special stain", "IHC", "Process all", "Deeper", "Decal",
						"Kept for fixation", "Electron Microscope", "Semi Thin", "EHC");
		String requests = "";
		// Combine all request types in 1 string for easy access at the frontend.
		// Eg: request types like Special stain + IHC, IHC, etc
		for (int i = 0; i < requestType.length(); i ++) {
			if (requestType.charAt(i) == '1') {
				requests += requestTypes.get(i) + " + ";
			}
		}
		
		this.requestType = requests == "" ? "No instruction" : requests.substring(0, requests.length() - 3);
		this.count = count;
	}

	public RequestCount() {

	}

	public String getRequestType() {
		return requestType;
	}

	public long getCount() {
		return count;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public void setCount(long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "RequestCount [requestType=" + requestType + ", count=" + count + "]";
	}

}
