import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PayMachineState } from './pay-machine.state';
import { ITransaction } from '../models/transaction.model';
import { EthersProviderService } from '../services/ethers-provider/ethers-provider.service';

import * as payMachineSelectors from '../store/pay-machine.selectors';
import * as payMachineActions from '../store/pay-machine.actions';

@Injectable({
    providedIn: 'root'
})
export class PayMachineFacade {
    
    constructor(
        private store: Store<PayMachineState>,
        private ethersProvider: EthersProviderService
    ) { }

    network$: Observable<string> = this.store.select(payMachineSelectors.selectNetwork);
    networkChainId$: Observable<number> = this.store.select(payMachineSelectors.selectNetworkChainId);
    currentAccount$: Observable<string> = this.store.select(payMachineSelectors.selectCurrentAccount);
    currentAccountBalance$: Observable<string> = this.store.select(payMachineSelectors.selectCurrentAccountBalance);
    accounts$: Observable<string[]> = this.store.select(payMachineSelectors.selectAccounts);
    transactions$: Observable<ITransaction[]> = this.store.select(payMachineSelectors.selectTransactions);
    sendTransactionSuccessful$: Observable<boolean | undefined> = this.store.select(payMachineSelectors.sendTransactionSuccessful);
    
    networkRefreshOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectNetworkRefreshOkay);
    fetchCurrentAccountOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectFetchCurrentAccountOkay);
    fetchBalanceOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectFetchBalanceOkay);
    fetchAccountsOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectFetchAccountsOkay);
    fetchTransactionsOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectFetchTransactionsOkay);
    sendTransactionOkay$: Observable<boolean> = this.store.select(payMachineSelectors.selectSendTransactionOkay);

    networkRefreshError$: Observable<string> = this.store.select(payMachineSelectors.selectNetworkRefreshError);
    fetchCurrentAccountError$: Observable<string> = this.store.select(payMachineSelectors.selectFetchCurrentAccountError);
    fetchBalanceError$: Observable<string> = this.store.select(payMachineSelectors.selectFetchBalanceError);
    fetchAccountsError$: Observable<string> = this.store.select(payMachineSelectors.selectFetchAccountsError);
    fetchTransactionsError$: Observable<string> = this.store.select(payMachineSelectors.selectFetchTransactionsError);
    sendTransactionError$: Observable<string> = this.store.select(payMachineSelectors.selectSendTransactionError);

    refreshNetwork(): void {
        this.store.dispatch(payMachineActions.refreshNetwork());
    }

    getAccounts(): void {
        this.store.dispatch(payMachineActions.loadAccounts());
    }

    getCurrentAccount(): void {
        this.store.dispatch(payMachineActions.getCurrentAccount());
    }

    getCurrentAccountBalance(account: string, forEth: boolean = true): void {
        this.store.dispatch(payMachineActions.getBalance({ account: account, forEth: forEth }));
    }

    loadTransactions(account: string, forEth: boolean = true): void {
        this.store.dispatch(payMachineActions.loadTransactions({ account: account, forEth: forEth }));
    }

    sendTransaction(symbol: string, from: string, to: string, amount: string): void {
        const transaction: ITransaction = { symbol: symbol, from: from, to: to, amount: amount };
        this.store.dispatch(payMachineActions.submitTransaction({ transaction: transaction}));
    }
}
