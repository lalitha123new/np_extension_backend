/**
 * Controller class having end points for data needed and to be displayed on a daily basis
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
import com.nplab.extension.dashboard.service.CasesCount;
import com.nplab.extension.dashboard.service.DataSummary;
import com.nplab.extension.dashboard.service.SampleStatsService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DailyController {

	private SampleStatsService sampleStatsService;
	private JwtUtil jwtUtil;

	@Autowired
	public DailyController(SampleStatsService sampleStatsService, JwtUtil jwtUtil) {
		this.sampleStatsService = sampleStatsService;
		this.jwtUtil = jwtUtil;
	}

	/**
	 *
	 * @param days No. of days before the current days, since when cases are to be counted daily
	 * @param token JWT for user authentication
	 * @return List of CasesCount objects having the no. of internal cases and external cases
	 */
	@GetMapping(path = "/count/daily/{days}")
	public List<CasesCount> getCasesCount(@PathVariable int days, @RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.findCasesCount(days);
	}

	/**
	 *
	 * @param time Over the time, cases are to be counted i.e. this month or year
	 * @param token JWT for user authentication
	 * @return Count of cases registered in the time specified
	 */
	@GetMapping(path = "/count/{time}")
	public long getCasesOverTime(@PathVariable String time, @RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return this.sampleStatsService.countCasesOverTime(time);
	}

	/**
	 *
	 * @param toSummarize Column name whose data is to be summarised
	 * @param token JWT for user authentication
	 * @return DataSummary object containing the mean and maximum value of the column
	 */
	@GetMapping(path = "/summary/{toSummarize}")
	public DataSummary getDataSummary(@PathVariable String toSummarize,
			@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.summarizeData(toSummarize);
	}
}
