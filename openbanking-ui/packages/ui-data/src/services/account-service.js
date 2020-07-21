import createRequest from './request'
import { setData } from '../actions/app'
import { setAccountId } from '../actions/account'

var mockData = {
    "Data": {
        "VirtualAccFlag": "true",
        "AccountId": "a0031afc-8c2a-419a-88f4-5116f96c178a",
        "VirtualAccounts": [
            {
                "VirtualAccId": "d9a3c34c-ad7a-47be-8308-4751778241b2",
                "TagName": "House Loan",
                "PrincipalAmount": "10000.00",
                "AutoDebitDate": "2020-07-10T02:59:00.000Z",
                "DueDate": "2020-07-01T12:35:00.000Z",
                "Interest": "7.39",
                "VirtualAccType": "ROLLOVER",
                "Currency": "GBP",
                "Term": null
            },
            {
                "VirtualAccId": "d6b60051-c603-4836-950e-1f150a49dd57",
                "TagName": "Car Loan",
                "PrincipalAmount": "5000.00",
                "AutoDebitDate": "2020-07-05T02:59:00.000Z",
                "DueDate": "2020-07-01T12:35:00.000Z",
                "Interest": "1.64",
                "VirtualAccType": "ROLLOVER",
                "Currency": "GBP",
                "Term": null
            },
            {
                "VirtualAccId": "d330aa06-9063-45bd-a337-5d37e37873b4",
                "TagName": "MM Savings",
                "PrincipalAmount": "0",
                "AutoDebitDate": "2020-07-01",
                "DueDate": "2030-07-01",
                "Interest": "1265.02",
                "VirtualAccType": "SAVINGS",
                "Currency": "GBP",
                "Term": "10 Years"
            }
        ]
    },
    "Links": null,
    "Meta": null
}
//accounts api's
export function getAccountList(dispatch) {
    createRequest(dispatch, '/aisp/accounts', 'GET', null, {}, function (
        response
    ) {
        //callback placeholder where one or multiple actions can be dispatched
        dispatch(setData(response))
        if(response.Data.Account.length>0){
            dispatch(setAccountId(response.Data.Account[0].AccountId))
        }
    })
}

// get account by id
export function getAccountById(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getAccountBalances(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}/balances`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getAccountTransactions(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}/transactions`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getAccountDirectDebits(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}/direct-debits`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getAccountStandingOrders(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}/standing-orders`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getVirtualAccount(dispatch, accountId) {
    createRequest(
        dispatch,
        `/aisp/accounts/${accountId}/virtualAccounts`,
        'GET',
        null,
        {},
        function (response) {
            dispatch(setData(response))
        }
    )
}

export function getAccountProducts(dispatch, params) {
    createRequest(dispatch, '/aisp/products', 'GET', params, {}, function (
        response
    ) {
        dispatch(setData(response))
    })
}
