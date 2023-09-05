import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, from, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { EthersProviderService } from '../services/ethers-provider/ethers-provider.service';
import * as payMachineActions from './pay-machine.actions';

@Injectable()
export class PayMachineEffects {

  constructor(
    private actions$: Actions,
    private ethersProvider: EthersProviderService
  ) { }
  
  refreshNetwork$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.refreshNetwork),
    exhaustMap(
        () => this.ethersProvider.refreshNetwork()
        .pipe(
            map(network => payMachineActions.refreshNetworkSuccess({ network: network ?? 0 })),
            catchError(() => of(payMachineActions.refreshNetworkFailure({ error: 'error' })))
        )
    )
  ));

  loadCurrentAccount$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.getCurrentAccount),
    exhaustMap(
        () => this.ethersProvider.getAccount()
        .pipe(
            map(account => payMachineActions.setCurrentAccount({ account: account ?? "" })),
            catchError(() => of(payMachineActions.getCurrentAccountFailure({ error: 'error' })))
        )
    )
  ));

  getBalance$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.getBalance),
    exhaustMap(
        (action) => this.ethersProvider.getBalance(action.account, action.forEth)
        .pipe(
            map(balance => payMachineActions.getBalanceSuccess({ balance: balance ?? "" })),
            catchError(() => of(payMachineActions.getBalanceFailure({ error: 'error' })))
        )
    )
  ));

  loadAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.loadAccounts),
    exhaustMap(
        () => this.ethersProvider.getAccounts()
        .pipe(
            map(accounts => payMachineActions.loadAccountsSuccess({ accounts: accounts ?? [] })),
            catchError(() => of(payMachineActions.loadAccountsFailure({ error: 'error' })))
        )
    )
  ));

  loadTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.loadTransactions),
    exhaustMap(
        (action) => this.ethersProvider.getTransactions(action.account, action.forEth)
        .pipe(
            map(transactions => payMachineActions.loadTransactionsSuccess({ transactions: transactions })),
            catchError(() => of(payMachineActions.loadTransactionsFailure({ error: 'error' })))
        )
    )
  ));

  submitTransaction$ = createEffect(() => this.actions$.pipe(
    ofType(payMachineActions.submitTransaction),
    exhaustMap(
        (action) => this.ethersProvider.sendTransaction(action.transaction)
        .pipe(
            map(transaction => payMachineActions.submitTransactionSuccess({ 
                transaction: transaction ?? action.transaction  
            })),
            catchError(() => of(payMachineActions.submitTransactionFailure({ error: 'error' })))
        )
    )
  ));

}
