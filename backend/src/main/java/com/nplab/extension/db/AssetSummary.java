/**
 * DB class for mapping to asset_summary table in TrackerDb. This is a table with all asset details
 * with TAT and special requests.
 * Contains getters, setters and overridden toString()
 * @author Vaibhavi Lokegaonkar
 */
package com.nplab.extension.db;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.Days;

@Immutable
@Entity
@Table(name = "asset_summary")
public class AssetSummary {
	
	@Id
	@Column(name = "np_number")
	private String npNumber;
	
	@Column(name = "biopsy_type")
	private String biopsyType;
	
	@Column(name = "start_time")
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime startTime;
	
	@Column(name = "end_time")
	@Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
	private DateTime endTime;
	
	@Column(name = "special_stain")
	private boolean specialStains;
	
	@Column(name = "ihc")
	private boolean ihc;
	
	@Column(name = "decal")
	private boolean decal;
	
	@Column(name = "deeper")
	private boolean deeper;
	
	@Column(name = "process_all")
	private boolean processAll;
	
	@Column(name = "kept_for_fixation")
	private boolean keptForFixation;
	
	@Column(name = "ehc")
	private boolean ehc;
	
	@Column(name = "semithin")
	private boolean semithin;

	@Column(name = "em")
	private boolean em;

	@Column(name = "TAT")
	private Integer tat;
	
	@Column(name = "request_code")
	private String requestCode;
	
	public AssetSummary(String npNumber, String biopsyType, DateTime startTime, DateTime endTime,
			boolean specialStains, boolean ihc, boolean decal, boolean deeper, boolean processAll,
			boolean keptForFixation, boolean ehc, boolean semithin, boolean em, String requestType) {
		this.npNumber = npNumber;
		this.biopsyType = biopsyType;
		this.startTime = startTime;
		this.endTime = endTime;
		this.specialStains = specialStains;
		this.ihc = ihc;
		this.decal = decal;
		this.deeper = deeper;
		this.processAll = processAll;
		this.keptForFixation = keptForFixation;
		this.ehc = ehc;
		this.semithin = semithin;
		this.em = em;
		this.tat = Days.daysBetween(startTime, endTime).getDays();
		this.requestCode = requestType;
	}

	public AssetSummary() {
		
	}

	public String getNpNumber() {
		return npNumber;
	}

	public String getBiopsyType() {
		return biopsyType;
	}

	public DateTime getStartTime() {
		return startTime;
	}

	public DateTime getEndTime() {
		return endTime;
	}

	public boolean isSpecialStains() {
		return specialStains;
	}

	public boolean isIhc() {
		return ihc;
	}

	public boolean isDecal() {
		return decal;
	}

	public boolean isDeeper() {
		return deeper;
	}

	public boolean isProcessAll() {
		return processAll;
	}

	public boolean isKeptForFixation() {
		return keptForFixation;
	}

	public String getRequestCode() {
		return requestCode;
	}

	public boolean isEhc() {
		return ehc;
	}

	public boolean isSemithin() {
		return semithin;
	}

	public boolean isEm() {
		return em;
	}

	public long getTat() {
		return tat;
	}
	
	public void setRequestType(String requestType) {
		this.requestCode = requestType;
	}

	public void setNpNumber(String npNumber) {
		this.npNumber = npNumber;
	}

	public void setBiopsyType(String biopsyType) {
		this.biopsyType = biopsyType;
	}

	public void setStartTime(DateTime startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(DateTime endTime) {
		this.endTime = endTime;
	}

	public void setSpecialStains(boolean specialStains) {
		this.specialStains = specialStains;
	}

	public void setIhc(boolean ihc) {
		this.ihc = ihc;
	}

	public void setDecal(boolean decal) {
		this.decal = decal;
	}

	public void setDeeper(boolean deeper) {
		this.deeper = deeper;
	}

	public void setProcessAll(boolean processAll) {
		this.processAll = processAll;
	}

	public void setKeptForFixation(boolean keptForFixation) {
		this.keptForFixation = keptForFixation;
	}

	public void setEhc(boolean ehc) {
		this.ehc = ehc;
	}

	public void setSemithin(boolean semithin) {
		this.semithin = semithin;
	}

	public void setEm(boolean em) {
		this.em = em;
	}

	public void setTat(Integer tat) {
		this.tat = tat == null ? 0 : tat;
	}

	@Override
	public String toString() {
		return "AssetSummary [npNumber=" + npNumber + ", biopsyType=" + biopsyType + "]";
	}
	
}
