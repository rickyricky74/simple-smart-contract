import { createReducer, on } from '@ngrx/store';
import { PayMachineState } from './pay-machine.state';
import * as payMachineActions from './pay-machine.actions';

export const initialState: PayMachineState = {
    networkChainId: 0,
    network: '',
    currentAccount: '',
    currentAccountBalance: '',
    accounts: [],
    transactions: [],
    sendTranactionSuccessful: undefined,
    networkRefreshOkay: true,
    fetchCurrentAccountOkay: true,
    fetchAccountsOkay: true,
    fetchBalanceOkay: true,
    fetchTransactionsOkay: true,
    sendTransactionOkay: true,
    networkRefreshError: '',
    fetchCurrentAccountError: '',
    fetchAccountsError: '',
    fetchBalanceError: '',
    fetchTransactionsError: '',
    sendTransactionError: '',
};

export const payMachineReducer = createReducer(
    initialState,
    on(payMachineActions.refreshNetworkSuccess, (state, { network }) => {
        state = { 
            ...state, 
            networkRefreshOkay: true,
            networkRefreshError: '',
            networkChainId: network,
            network: ( network === 31337 ? "localhost" : network === 59140 ? "Linea Testnet" : "Unsupported Network" ),
            transactions: [ ...state.transactions ], 
            currentAccountBalance: ''
        };

        state.transactions = (network !== 31337 && network !== 59140) || state.networkChainId !== network ? [] : state.transactions;

        return state;
    }),
    on(payMachineActions.refreshNetworkFailure, (state, { error }) => (
        { 
            ...state, 
            currentAccountBalance: '',
            transactions: [],
            networkRefreshOkay: false,
            networkRefreshError: error
        }
    )),
    on(payMachineActions.setCurrentAccount, (state, { account }) => ({ ...state, currentAccount: account, fetchCurrentAccountOkay: true, fetchCurrentAccountError: '' })),
    on(payMachineActions.getCurrentAccountFailure, (state, { error }) => ({...state, fetchCurrentAccountOkay: false, fetchCurrentAccountError: error })),
    on(payMachineActions.getBalanceSuccess, (state, { balance }) => ({ ...state, currentAccountBalance: balance, fetchBalanceOkay: true, fetchBalanceError: '' })),
    on(payMachineActions.getBalanceFailure, (state, { error }) => ({ ...state, currentAccountBalance: '0.00', fetchBalanceOkay: false, fetchBalanceError: error })),
    on(payMachineActions.loadAccountsSuccess, (state, { accounts }) => ({ ...state, accounts, fetchAccountsOkay: true, fetchAccountsError: '' })),
    on(payMachineActions.loadAccountsFailure, (state, { error }) => ({ ...state, account: [], fetchAccountsOkay: false, fetchAccountsError: error })),
    on(payMachineActions.loadTransactionsSuccess, (state, { transactions }) => ({ ...state, transactions, fetchTransactionsOkay: true, fetchTransactionsError: '' })),
    on(payMachineActions.loadTransactionsFailure, (state, { error }) => ({ ...state, transactions: [], fetchTransactionsOkay: false, fetchTransactionsError: error })),
    on(payMachineActions.submitTransactionSuccess, (state, { transaction }) => ({ ...state, transactions: [...state.transactions, transaction], sendTranactionSuccessful: true })),
    on(payMachineActions.clearSubmitTransactionSuccess, (state) => ({ ...state, sendTranactionSuccessful: undefined })),
    on(payMachineActions.submitTransactionFailure, (state, { error }) => ({ ...state, sendTransactionOkay: false, sendTransactionError: error })),
    on(payMachineActions.clearNetworkRefreshError, (state) => ({ ...state, networkRefreshOkay: true, networkRefreshError: '' })),
    on(payMachineActions.clearFetchCurrentAccountError, (state) => ({ ...state, fetchCurrentAccountOkay: true, fetchCurrentAccountError: '' })),
    on(payMachineActions.clearFetchBalanceError, (state) => ({ ...state, fetchBalanceOkay: true, fetchBalanceError: '' })),
    on(payMachineActions.clearFetchAccountsError, (state) => ({ ...state, fetchAccountsOkay: true, fetchAccountsError: '' })),
    on(payMachineActions.clearFetchTransactionsError, (state) => ({ ...state, fetchTransactionsOkay: true, fetchTransactionsError: '' })),
    on(payMachineActions.clearSendTransactionError, (state) => ({ ...state, sendTransactionOkay: true, sendTransactionError: '' })),

);

