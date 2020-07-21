package com.bankofapis.core.model.accounts;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OBReadVirtualAccDetails {

		@JsonProperty("VirtualAccId")
	    private String virtualAccId;

	    @JsonProperty("TagName")
	    private String tagName;

	    @JsonProperty("PrincipalAmount")
	    private String principalAmount;
	    
	    @JsonProperty("AutoDebitDate")
	    private String autoDebitDate;
	    
	    @JsonProperty("DueDate")
	    private String dueDate;
	    
	    @JsonProperty("Interest")
	    private String interestAccumlated;
	    
	    @JsonProperty("VirtualAccType")
	    private VirtualAccountType virtualAccountType;
	    
	    @JsonProperty("Currency")
	    private String currency;
	    
	    @JsonProperty("Term")
	    private String term;
	    
		public String getVirtualAccId() {
			return virtualAccId;
		}

		public void setVirtualAccId(String virtualAccId) {
			this.virtualAccId = virtualAccId;
		}

		public String getTagName() {
			return tagName;
		}

		public void setTagName(String tagName) {
			this.tagName = tagName;
		}

		public String getPrincipalAmount() {
			return principalAmount;
		}

		public void setPrincipalAmount(String principalAmount) {
			this.principalAmount = principalAmount;
		}

		public String getAutoDebitDate() {
			return autoDebitDate;
		}

		public void setAutoDebitDate(String autoDebitDate) {
			this.autoDebitDate = autoDebitDate;
		}

		public String getDueDate() {
			return dueDate;
		}

		public void setDueDate(String dueDate) {
			this.dueDate = dueDate;
		}

		public String getInterestAccumlated() {
			return interestAccumlated;
		}

		public void setInterestAccumlated(String interestAccumlated) {
			this.interestAccumlated = interestAccumlated;
		}

		public VirtualAccountType getVirtualAccountType() {
			return virtualAccountType;
		}

		public void setVirtualAccountType(VirtualAccountType virtualAccountType) {
			this.virtualAccountType = virtualAccountType;
		}

		public String getCurrency() {
			return currency;
		}

		public void setCurrency(String currency) {
			this.currency = currency;
		}

		public String getTerm() {
			return term;
		}

		public void setTerm(String term) {
			this.term = term;
		}
	    
}
