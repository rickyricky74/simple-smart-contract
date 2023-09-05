import { createAction, props } from '@ngrx/store';
import { ITransaction } from '../models/transaction.model';

export const refreshNetwork = createAction('[PayMachine] Refresh Network');
export const refreshNetworkSuccess = createAction('[PayMachine] Refresh Network Success', props<{ network: number }>());
export const refreshNetworkFailure = createAction('[PayMachine] Refresh Network Failure', props<{ error: any }>());

export const getCurrentAccount = createAction('[PayMachine] Get Current Account');
export const setCurrentAccount = createAction('[PayMachine] Set Current Account', props<{ account: string }>());
export const getCurrentAccountFailure = createAction('[PayMachine] Get Current Account Failure', props<{ error: any }>());

export const getBalance = createAction('[PayMachine] Get Balance', props<{ account: string, forEth: boolean }>());
export const getBalanceSuccess = createAction('[PayMachine] Get Balance Success', props<{ balance: string }>());
export const getBalanceFailure = createAction('[PayMachine] Get Balance Failure', props<{ error: any }>());

export const loadAccounts = createAction('[PayMachine] Load Accounts');
export const loadAccountsSuccess = createAction('[PayMachine] Load Accounts Success', props<{ accounts: string[] }>());
export const loadAccountsFailure = createAction('[PayMachine] Load Accounts Failure', props<{ error: any }>());

export const loadTransactions = createAction('[PayMachine] Load ETH Transactions', props<{ account: string, forEth: boolean }>());
export const loadTransactionsSuccess = createAction('[PayMachine] Load ETH Transactions Success', props<{ transactions: ITransaction[] }>());
export const loadTransactionsFailure = createAction('[PayMachine] Load ETH Transactions Failure', props<{ error: any }>());

export const submitTransaction = createAction('[PayMachine] Submit Transaction', props<{ transaction: ITransaction }>());
export const submitTransactionSuccess = createAction('[PayMachine] Submit Transaction Success', props<{ transaction: ITransaction } >());
export const clearSubmitTransactionSuccess = createAction('[PayMachine] Clear Submit Transaction Success');
export const submitTransactionFailure = createAction('[PayMachine] Submit Transaction Failure', props<{ error: any }>());

export const clearNetworkRefreshError = createAction('[PayMachine] Clear Network Refresh Error');
export const clearFetchCurrentAccountError = createAction('[PayMachine] Clear Fetch Current Account Error');
export const clearFetchBalanceError = createAction('[PayMachine] Clear Fetch Balance Error');
export const clearFetchAccountsError = createAction('[PayMachine] Clear Fetch Accounts Error');
export const clearFetchTransactionsError = createAction('[PayMachine] Clear Fetch Transactions Error');
export const clearSendTransactionError = createAction('[PayMachine] Clear Send Transaction Error');

