/**
 * Controller for stats for report generation, i.e. counts of cases of different biopsy types, TAT intervals
 * and special requests/tests
 * @author Vaibhavi Lokegaonkar
 */
package com.nplab.extension.dashboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nplab.extension.auth.JwtUtil;
import com.nplab.extension.dashboard.service.SampleStatsService;
import com.nplab.extension.db.RequestCount;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class ReportStatsController {
	private SampleStatsService sampleStatsService;
	private JwtUtil jwtUtil;

	@Autowired
	public ReportStatsController(SampleStatsService sampleStatsService, JwtUtil jwtUtil) {
		this.sampleStatsService = sampleStatsService;
		this.jwtUtil = jwtUtil;
	}

	/**
	 * Validates JWT and returns a list of number of cases in a given time interval grouped by different
	 * biopsy types
	 * @param startTime Start date of the time interval where cases are counted
	 * @param endTime End date of the time interval where cases are counted
	 * @param token JWT for the session
	 * @return List of number of cases grouped by biopsy types
	 */
	@GetMapping(path = "/cases/{startTime}/{endTime}")
	public List<Long> getSampleTypeStats(@PathVariable String startTime,
												@PathVariable String endTime,
												@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.findSampleTypeBreakout(startTime, endTime);
	}

	/**
	 * Validates JWT and returns a list of number of cases of a certain biopsy type with TAT lying in different
	 * intervals
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param startValues List of start values of the range where TAT of a case should lie to be counted
	 * @param endValues List of end value of the range where TAT of a case should lie to be counted
	 * @param token JWT for the session
	 * @return List of numbers of cases of a certain biopsy type whose TAT lies in specified intervals
	 */
	@GetMapping(path = "/tat/{sampleType}/{startValues}/{endValues}")
	public List<Long> getTatStats(@PathVariable String sampleType, 
							@PathVariable List<Integer> startValues,
							@PathVariable List<Integer> endValues,
							@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.findTatBreakout(sampleType, startValues, endValues);
	}

	/**
	 * Validates JWT and returns a list of numbers of cases of a certain biopsy type, and TAT within a certain
	 * range with different special requests/tests
	 * @param sampleType Biopsy type of case for it to be counted
	 * @param tatStart Start value of the range where TAT of the case should lie to be counted
	 * @param tatEnd End value of the range where TAT of a case should lie to be counted
	 * @param token JWT for the session
	 * @return List of numbers of cases of a certain biopsy type, and TAT within a certain range with
	 * different special requests/tests
	 */
	@GetMapping(path = "/requests/{sampleType}/{tatStart}/{tatEnd}")
	public List<RequestCount> getRequestStats(@PathVariable String sampleType, 
											@PathVariable int tatStart, 
											@PathVariable int tatEnd,
											@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.findRequestBreakout(sampleType, tatStart, tatEnd);
	}
}
