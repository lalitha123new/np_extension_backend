/**
 * Controller class having the end points for pending cases data
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
import com.nplab.extension.db.PendingAsset;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard/pending")
public class PendingStatsController {

	private SampleStatsService sampleStatsService;
	private JwtUtil jwtUtil;

	@Autowired
	public PendingStatsController(SampleStatsService sampleStatsService, JwtUtil jwtUtil) {
		this.sampleStatsService = sampleStatsService;
		this.jwtUtil = jwtUtil;
	}
	/**
	 * Validates JWT for the session, if it's valid returns a list of pending cases
	 * @param token: JWT of the session
	 * @return List of all pending cases
	 * */
	@GetMapping
	public List<PendingAsset> getPendingAssets(@RequestHeader(name = "Authorization") String token) { 
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		
		return this.sampleStatsService.findPendingAssets();
	}

	/**
	 * Validates JWT for the session and returns the total number of pending cases
	 * @param token: JWT of the session
	 * @return Number of pending cases
	 */
	@GetMapping(path = "/count")
	public long getPendingAssetsCount(@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7); 
		
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return this.sampleStatsService.countPendingAssets();
	}

	/**
	 * Validates JWT and returns the list of internal or external pending cases, as indicated by the origin parameter
	 * @param origin The place where case is registered i.e. internal or external
	 * @param token JWT of the session
	 * @return List of pending cases
	 */
	@GetMapping(path = "/{origin}")
	public List<PendingAsset> getPendingAssetsByType(@PathVariable String origin, @RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return this.sampleStatsService.findPendingCasesByOrigin(origin);
	}

	/**
	 * Validates JWT and returns the list of pending cases which were registered either internally
	 * or externally or with an odd or even NP number
	 * @param token JWT for the session
	 * @param origin The place where case is registered i.e. internal or external
	 * @param parity Parity of NP number whether odd or even
	 * @return List of pending cases
	 */
	@GetMapping(path = "/{origin}/{parity}")
	public List<PendingAsset> getPendingAssetsByOriginAndParity(@RequestHeader(name = "Authorization") String token,
			@PathVariable String origin, @PathVariable String parity) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return this.sampleStatsService.findPendingCasesByOriginAndParity(origin, parity);
	}

	/**
	 * Validates JWT and returns the list of number of (origin and parity based) pending cases in different
	 * time intervals
	 * @param origin The place where case is registered i.e. internal or external
	 * @param parity Parity of NP number whether odd or even
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @param token JWT for the session
	 * @return List of number of pending cases
	 */
	@GetMapping(path = "/chart/{origin}/{parity}/{startDays}/{endDays}")
	public List<Long> getPendingStatsByTypeAndParity(@PathVariable String origin, @PathVariable String parity,
			@PathVariable List<Integer> startDays, @PathVariable List<Integer> endDays, 
			@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		
		return sampleStatsService.findPendingAssetsBreakout(startDays, endDays, origin, parity); 
	}

	/**
	 * Validates JWT and returns the list of number of (origin based) pending cases in different
	 * time intervals
	 * @param origin The place where case is registered i.e. internal or external
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @param token JWT for the session
	 * @return List of number of pending cases
	 */
	@GetMapping(path = "/chart/{origin}/{startDays}/{endDays}")
	public List<Long> getPendingStatsByType(@PathVariable String origin, @PathVariable List<Integer> startDays,
			@PathVariable List<Integer> endDays,
			@RequestHeader(name = "Authorization") String token) {
		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		
		return sampleStatsService.findPendingAssetsBreakout(startDays, endDays, origin);
	}

	/**
	 * Validates JWT and returns the list of number of pending cases in different time intervals
	 * @param startDays List of starting times of time intervals where pending cases are to be counted
	 * @param endDays List of ending times of time intervals where pending cases are to be counted
	 * @param token JWT for the session
	 * @return List of number of pending cases
	 */
	@GetMapping(path = "/chart/{startDays}/{endDays}")
	public List<Long> getPendingStats(@PathVariable List<Integer> startDays, @PathVariable List<Integer> endDays,
			@RequestHeader(name = "Authorization") String token) {

		token = token.substring(7);
		if (jwtUtil.isTokenExpired(token)) {
			throw new AccessDeniedException("Unauthorized");
		}
		return sampleStatsService.findPendingAssetsBreakout(startDays, endDays);
	}

}
