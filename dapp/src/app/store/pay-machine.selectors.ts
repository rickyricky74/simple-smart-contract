import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { PayMachineState } from './pay-machine.state';

export const selectPayMachineState = createFeatureSelector<PayMachineState>('payMachineState');
export const selectNetwork = createSelector(selectPayMachineState, (state: PayMachineState) => state.network);
export const selectNetworkChainId = createSelector(selectPayMachineState, (state: PayMachineState) => state.networkChainId);
export const selectCurrentAccount = createSelector(selectPayMachineState, (state: PayMachineState) => state.currentAccount);
export const selectCurrentAccountBalance = createSelector(selectPayMachineState, (state: PayMachineState) => state.currentAccountBalance);
export const selectAccounts = createSelector(selectPayMachineState, selectCurrentAccount, (state: PayMachineState, currentAccount: string) => {
    return state.accounts.filter(account => account !== currentAccount);
});
export const selectTransactions = createSelector(selectPayMachineState, (state: PayMachineState) => state.transactions);
export const sendTransactionSuccessful = createSelector(selectPayMachineState, (state: PayMachineState) => state.sendTranactionSuccessful);

export const selectNetworkRefreshOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.networkRefreshOkay);
export const selectFetchCurrentAccountOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchCurrentAccountOkay);
export const selectFetchBalanceOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchBalanceOkay);
export const selectFetchAccountsOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchAccountsOkay);
export const selectFetchTransactionsOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchTransactionsOkay);
export const selectSendTransactionOkay = createSelector(selectPayMachineState, (state: PayMachineState) => state.sendTransactionOkay);

export const selectNetworkRefreshError = createSelector(selectPayMachineState, (state: PayMachineState) => state.networkRefreshError);
export const selectFetchCurrentAccountError = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchCurrentAccountError);
export const selectFetchBalanceError = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchBalanceError);
export const selectFetchAccountsError = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchAccountsError);
export const selectFetchTransactionsError = createSelector(selectPayMachineState, (state: PayMachineState) => state.fetchTransactionsError);
export const selectSendTransactionError = createSelector(selectPayMachineState, (state: PayMachineState) => state.sendTransactionError);
