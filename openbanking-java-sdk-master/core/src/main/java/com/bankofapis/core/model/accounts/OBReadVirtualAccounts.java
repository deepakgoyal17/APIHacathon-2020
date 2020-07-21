package com.bankofapis.core.model.accounts;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OBReadVirtualAccounts {
	
	@JsonProperty("VirtualAccFlag")
	private String isVirtualAccounts = "true";
	
    @JsonProperty("AccountId")
    private String accountId;

    @JsonProperty("VirtualAccounts")
    private List<OBReadVirtualAccDetails> virtualAccounts;

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public List<OBReadVirtualAccDetails> getVirtualAccounts() {
		return virtualAccounts;
	}

	public void setVirtualAccounts(List<OBReadVirtualAccDetails> virtualAccounts) {
		this.virtualAccounts = virtualAccounts;
	}
    
    
}
