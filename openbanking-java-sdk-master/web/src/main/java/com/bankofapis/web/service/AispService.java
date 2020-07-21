package com.bankofapis.web.service;

import static com.bankofapis.core.model.common.Constants.CLIENT_CRED_GRANT_TYPE_VALUE;
import static com.bankofapis.core.model.common.Constants.SCOPE_ACCOUNT_VALUE;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;

import com.bankofapis.core.model.accounts.OBReadAccountList;
import com.bankofapis.core.model.accounts.OBReadBalanceList;
import com.bankofapis.core.model.accounts.OBReadBeneficiaryList;
import com.bankofapis.core.model.accounts.OBReadDataDomesticConsent;
import com.bankofapis.core.model.accounts.OBReadDataResponse;
import com.bankofapis.core.model.accounts.OBReadDirectDebitList;
import com.bankofapis.core.model.accounts.OBReadDomesticConsent;
import com.bankofapis.core.model.accounts.OBReadDomesticConsentResponse;
import com.bankofapis.core.model.accounts.OBReadProductList;
import com.bankofapis.core.model.accounts.OBReadStandingOrderList;
import com.bankofapis.core.model.accounts.OBReadTransaction;
import com.bankofapis.core.model.accounts.OBReadTransactionList;
import com.bankofapis.core.model.accounts.OBReadVirtualAccDetails;
import com.bankofapis.core.model.accounts.OBReadVirtualAccounts;
import com.bankofapis.core.model.accounts.VirtualAccountType;
import com.bankofapis.core.model.common.HttpRequestHeader;
import com.bankofapis.core.model.payments.OBRisk;
import com.bankofapis.core.model.token.TokenRequest;
import com.bankofapis.core.model.token.TokenResponse;
import com.bankofapis.remote.config.ClientConfig;
import com.bankofapis.remote.service.AispRemote;
import com.bankofapis.remote.service.TokenRemote;
import com.bankofapis.web.filter.HttpRequestContext;

public class AispService {

	private static final Logger logger = LoggerFactory.getLogger(AispService.class);

	private AispRemote aispRemote;
	private TokenRemote tokenRemote;
	private ClientConfig clientConfig;

	public AispService(AispRemote aispRemote, TokenRemote tokenRemote, ClientConfig clientConfig) {
		this.aispRemote = aispRemote;
		this.tokenRemote = tokenRemote;
		this.clientConfig = clientConfig;
	}

	public String initialize() {
		try {

			if (Boolean.FALSE.equals(clientConfig.isInitRunning())) {
				throw new RuntimeException("SDK is not running in INIT mode");
			}

			TokenRequest tokenRequest = new TokenRequest();
			tokenRequest.setClientId(clientConfig.getClientId());
			tokenRequest.setClientSecret(clientConfig.getClientSecret());
			tokenRequest.setScope(SCOPE_ACCOUNT_VALUE);
			tokenRequest.setGrantType(CLIENT_CRED_GRANT_TYPE_VALUE);
			TokenResponse tokenResponse = tokenRemote.generateToken(tokenRequest);

			HttpRequestHeader httpRequestHeader = HttpRequestContext.get();
			httpRequestHeader.setAuthorization(tokenResponse.getTokenType() + " " + tokenResponse.getAccessToken());
			httpRequestHeader.setFinancialId(clientConfig.getFinancialId());
			HttpRequestContext.set(httpRequestHeader);

			String[] aispPermissions = new String[] { "ReadAccountsBasic", "ReadAccountsDetail", "ReadBalances",
					"ReadBeneficiariesBasic", "ReadBeneficiariesDetail", "ReadDirectDebits", "ReadProducts",
					"ReadStandingOrdersBasic", "ReadStandingOrdersDetail", "ReadTransactionsBasic",
					"ReadTransactionsCredits", "ReadTransactionsDebits", "ReadTransactionsDetail" };

			OBReadDomesticConsent obReadDataDomesticConsent = new OBReadDomesticConsent();
			obReadDataDomesticConsent.setData(new OBReadDataDomesticConsent());
			obReadDataDomesticConsent.setRisk(new OBRisk());

			obReadDataDomesticConsent.getData().setPermissions(Arrays.asList(aispPermissions));
			OBReadDomesticConsentResponse obReadDomesticConsentResponse = aispRemote
					.createAispConsent(obReadDataDomesticConsent, HttpRequestContext.get());

			return createAuthorizeUri(obReadDomesticConsentResponse.getData().getConsentId());
		} catch (HttpStatusCodeException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDomesticConsentResponse createAispConsent(OBReadDomesticConsent obReadDataDomesticConsent) {

		try {
			return aispRemote.createAispConsent(obReadDataDomesticConsent, HttpRequestContext.get());

		} catch (HttpStatusCodeException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}

	}

	public String createAuthorizeUri(String consentId) {
		return aispRemote.createAuthorizeUri(consentId);
	}

	public OBReadDataResponse<OBReadAccountList> getAccountResponse() {

		try {
			return aispRemote.getAccountResponse(HttpRequestContext.get());

		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}

	}

	public OBReadDataResponse<OBReadAccountList> getAccountById(String accountId) {
		try {
			return aispRemote.getAccountById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadBalanceList> getBalanceById(String accountId) {

		try {
			return aispRemote.getBalanceById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadTransactionList> getTransactionsById(String accountId) {
		try {
			return aispRemote.getTransactionsById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadDirectDebitList> getDirectDebitsById(String accountId) {
		try {
			return aispRemote.getDirectDebitsById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadStandingOrderList> getStandingOrdersById(String accountId) {
		try {
			return aispRemote.getStandingOrdersById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadProductList> getProductById(String accountId) {

		try {
			return aispRemote.getProductById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	public OBReadDataResponse<OBReadBeneficiaryList> getBeneficiariesById(String accountId) {
		try {
			return aispRemote.getBeneficiariesById(accountId, HttpRequestContext.get());
		} catch (HttpClientErrorException ex) {
			logger.error(ex.getResponseBodyAsString(), ex);
			throw ex;
		}
	}

	
	public OBReadDataResponse<OBReadVirtualAccounts> getVirtualAccounts(String accountId) {
		final DateTimeFormatter DTF_FullTimestamp = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		final DecimalFormat df = new DecimalFormat(".00");
		final OBReadDataResponse<OBReadVirtualAccounts> oBReadDataResponse = new OBReadDataResponse<>();
		final OBReadDataResponse<OBReadTransactionList> ttd = aispRemote.getTransactionsById(accountId, HttpRequestContext.get());
		final Optional<OBReadTransaction> creditInformation = ttd.getData().getTransactionList().stream().filter(
				x -> x.getTransactionInformation().contains("Salary") && x.getCreditDebitIndicator().equals("Credit"))
				.findFirst();
		final OBReadVirtualAccounts obaccDetailsList = new OBReadVirtualAccounts();
		final List<OBReadVirtualAccDetails> vAccDetails = new ArrayList<>();
		obaccDetailsList.setAccountId(accountId);		
		obaccDetailsList.setVirtualAccounts(vAccDetails);
		oBReadDataResponse.setData(obaccDetailsList);
		double moneyForSaving = 0d;
		if (creditInformation.isPresent()) {
			for (OBReadTransaction trxRead : ttd.getData().getTransactionList()) {
				if (trxRead.getCreditDebitIndicator().equals("Debit")
						&& isEligibleForTagging(trxRead.getTransactionInformation())) {
					final OBReadVirtualAccDetails obReadVirtualAccDetails = new OBReadVirtualAccDetails();
					obReadVirtualAccDetails.setTagName(trxRead.getTransactionInformation());
					obReadVirtualAccDetails.setPrincipalAmount(trxRead.getAmount().getAmount());
					obReadVirtualAccDetails.setCurrency(trxRead.getAmount().getCurrency());
					obReadVirtualAccDetails.setVirtualAccountType(VirtualAccountType.ROLLOVER);
					obReadVirtualAccDetails.setVirtualAccId(UUID.randomUUID().toString());
					obReadVirtualAccDetails.setDueDate(getNextBookingDate(trxRead.getBookingDateTime(),creditInformation.get().getBookingDateTime()));
					obReadVirtualAccDetails.setAutoDebitDate(getNextDueDate(creditInformation.get().getBookingDateTime()));
					obReadVirtualAccDetails.setInterestAccumlated(df
							.format(calculateInterestDaily(Double.valueOf(obReadVirtualAccDetails.getPrincipalAmount()),
									LocalDate.parse(creditInformation.get().getBookingDateTime(), DTF_FullTimestamp),
									LocalDate.parse(trxRead.getBookingDateTime(), DTF_FullTimestamp))));
					moneyForSaving = moneyForSaving + Double.valueOf(obReadVirtualAccDetails.getInterestAccumlated());
					vAccDetails.add(obReadVirtualAccDetails);		
					
				}
				
			}
			if (!vAccDetails.isEmpty()) {
				vAccDetails.add(getMMSavings(moneyForSaving));
				vAccDetails.add(getMMEquities(moneyForSaving));
			}
		}
		return oBReadDataResponse;
	}
	
	private Double calculateInterestDaily(Double principal, LocalDate creditInDate, LocalDate maturityDate) {
		float noOfDays = calculateDuration(creditInDate, maturityDate);
		float interestRate = 3;
		double rate = (1+(interestRate/100)/365);
		double aa = Math.pow(rate,365*(noOfDays/365));
		double comInterest = principal.doubleValue() * aa;		
		return comInterest-principal;
	}
	
	private Double calculateInterestMonthly(Double principal,float interestRate) {
		double rate = (interestRate/100);
		double comInterest = (principal * rate)/12;		
		return comInterest+principal;
	}

	private float calculateDuration(LocalDate creditInDate, LocalDate maturityDate) {
		final Period period = Period.between(creditInDate,maturityDate);
		return period.getDays();
	}
	
	private String getNextBookingDate(String bookingDate, String dueDate) {
		final DateTimeFormatter DTF_FullTimestamp = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	    final LocalDateTime currentBookingDate = LocalDateTime.parse(bookingDate,DTF_FullTimestamp);
	    final LocalDateTime currentDueDate = LocalDateTime.parse(dueDate,DTF_FullTimestamp);
	    if(LocalDateTime.now().isAfter(currentDueDate)) {			
			return LocalDateTime.of(currentBookingDate.getYear(), LocalDateTime.now().plusMonths(1).getMonth(),
					currentBookingDate.getDayOfMonth(), currentBookingDate.getHour(), currentBookingDate.getMinute())
					.format(DTF_FullTimestamp);
	    }
	    return bookingDate;
	}
	
	private String getNextDueDate(String dueDate) {
		final DateTimeFormatter DTF_FullTimestamp = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
	    final LocalDateTime currentDueDate = LocalDateTime.parse(dueDate,DTF_FullTimestamp);
	    if(LocalDateTime.now().isAfter(currentDueDate)) {
	    	return LocalDateTime.of(currentDueDate.getYear(), LocalDateTime.now().plusMonths(1).getMonth(),
	    			currentDueDate.getDayOfMonth(), currentDueDate.getHour(), currentDueDate.getMinute())
					.format(DTF_FullTimestamp);
	    }
	    return dueDate;
	}
	
	private boolean isEligibleForTagging(String transactionInformation) {
		return transactionInformation.contains("Loan") ||  transactionInformation.contains("Insurance") ||  transactionInformation.contains("Bill");
	}
	
	private OBReadVirtualAccDetails getMMSavings(Double moneyForSaving) {
		final DecimalFormat df = new DecimalFormat(".00");
		final OBReadVirtualAccDetails obReadVirtualAccDetails = new OBReadVirtualAccDetails();
		obReadVirtualAccDetails.setTagName("MM Savings");
		obReadVirtualAccDetails.setPrincipalAmount(df.format(moneyForSaving));
		obReadVirtualAccDetails.setVirtualAccountType(VirtualAccountType.SAVINGS);
		obReadVirtualAccDetails.setVirtualAccId(UUID.randomUUID().toString());
		Double compoundedSum = 0d;
		for (int i = 1; i <= 10 * 12; i++) {
			compoundedSum = Double.valueOf(compoundedSum) + Double.valueOf(moneyForSaving);
			compoundedSum = calculateInterestMonthly(compoundedSum, 3);

		}
		obReadVirtualAccDetails.setAutoDebitDate(LocalDate.of(2020, 07, 01).toString());
		obReadVirtualAccDetails.setDueDate(LocalDate.of(2020, 07, 01).plusYears(10).toString());
		obReadVirtualAccDetails.setInterestAccumlated(df.format(compoundedSum));
		obReadVirtualAccDetails.setCurrency("GBP");
		obReadVirtualAccDetails.setTerm("10 Years");
		return obReadVirtualAccDetails;
	}
	
	private OBReadVirtualAccDetails getMMEquities(Double moneyForSaving) {
		final DecimalFormat df = new DecimalFormat(".00");
		final OBReadVirtualAccDetails obReadVirtualAccDetails = new OBReadVirtualAccDetails();
		obReadVirtualAccDetails.setTagName("MM Equities");
		obReadVirtualAccDetails.setPrincipalAmount(df.format(moneyForSaving));
		obReadVirtualAccDetails.setVirtualAccountType(VirtualAccountType.SAVINGS);
		obReadVirtualAccDetails.setVirtualAccId(UUID.randomUUID().toString());
		Double compoundedSum = 0d;
		for (int i = 1; i <= 10 * 12; i++) {
			compoundedSum = Double.valueOf(compoundedSum) + Double.valueOf(moneyForSaving);
			compoundedSum = calculateInterestMonthly(compoundedSum, 6);

		}
		obReadVirtualAccDetails.setAutoDebitDate(LocalDate.of(2020, 07, 01).toString());
		obReadVirtualAccDetails.setDueDate(LocalDate.of(2020, 07, 01).plusYears(10).toString());
		obReadVirtualAccDetails.setInterestAccumlated(df.format(compoundedSum));
		obReadVirtualAccDetails.setCurrency("GBP");
		obReadVirtualAccDetails.setTerm("10 Years");
		return obReadVirtualAccDetails;
	}
}