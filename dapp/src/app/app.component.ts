import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable, interval, startWith, switchMap, of, EMPTY } from 'rxjs';
import { PayMachineFacade } from './store/pay-machine.facade';
import { ITransaction } from './models/transaction.model';
import { EthersProviderService } from 'src/app/services/ethers-provider/ethers-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  pollingInterval: number = 20000;
  maxPollingCount: number = 60;
  networkPollingCount: number = 0;
  accountPollingCount: number = 0;
  balancePollingCount: number = 0;

  networkPoller?: Subscription;
  accountPoller?: Subscription;
  balancePoller?: Subscription;
  subscriptions: Subscription[] = [];

  network$: Observable<string> = this.facade.network$;
  network: string = '';
  networkChainId$: Observable<number> = this.facade.networkChainId$;
  networkChainId: number = 0;
  networkClassNames: any = { "network-title": true, "unsupported": false };

  currentAccount$: Observable<string> = this.facade.currentAccount$;
  currentAccount: string = '';

  currentAccountBalance$: Observable<string> = this.facade.currentAccountBalance$;
  currentAccountBalance: string = '';

  accounts$: Observable<string[]> = this.facade.accounts$;
  accounts: string[] = [];

  transactions$: Observable<ITransaction[]> = this.facade.transactions$;
  transactions: ITransaction[] = [];

  sendTransactionSuccessful$: Observable<boolean | undefined> = this.facade.sendTransactionSuccessful$;
  sendTransactionSuccessful: boolean | undefined = undefined;

  networkRefreshOkay$: Observable<boolean> = this.facade.networkRefreshOkay$;
  networkRefreshOkay: boolean = true;

  fetchCurrentAccountOkay$: Observable<boolean> = this.facade.fetchCurrentAccountOkay$;
  fetchCurrentAccountOkay: boolean = true;

  fetchBalanceOkay$: Observable<boolean> = this.facade.fetchBalanceOkay$;
  fetchBalanceOkay: boolean = true;

  fetchAccountsOkay$: Observable<boolean> = this.facade.fetchAccountsOkay$;
  fetchAccountsOkay: boolean = true;

  fetchTransactionsOkay$: Observable<boolean> = this.facade.fetchTransactionsOkay$;
  fetchTransactionsOkay: boolean = true;

  sendTransactionOkay$: Observable<boolean> = this.facade.sendTransactionOkay$;
  sendTransactionOkay: boolean = true;

  networkRefreshError$: Observable<string> = this.facade.networkRefreshError$;
  networkRefreshError: string = '';

  fetchCurrentAccountError$: Observable<string> = this.facade.fetchCurrentAccountError$;
  fetchCurrentAccountError: string = '';

  fetchBalanceError$: Observable<string> = this.facade.fetchBalanceError$;
  fetchBalanceError: string = '';

  fetchAccountsError$: Observable<string> = this.facade.fetchAccountsError$;
  fetchAccountsError: string = '';

  fetchTransactionsError$: Observable<string> = this.facade.fetchTransactionsError$;
  fetchTransactionsError: string = '';

  sendTransactionError$: Observable<string> = this.facade.sendTransactionError$;
  sendTransactionError: string = '';

  selectedSymbol: string = 'ETH';
  sendAmount: string ='0.00';
  selectedAddress: string = '';
  sendTo: string = '';

  txTableColumns: string[] = ['to', 'amount', 'symbol'];

  constructor(
    private facade: PayMachineFacade, 
    private ethersProvider: EthersProviderService,
    private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.startNetworkPoller();
    this.startAccountPoller();
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.networkPoller?.unsubscribe();
    this.accountPoller?.unsubscribe();
    this.balancePoller?.unsubscribe();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  subscribe(): void {

    this.subscriptions.push(
      this.networkChainId$.subscribe(chainId => {
        this.networkChainId = chainId;
        this.networkClassNames = { ...this.networkClassNames, unsupported: chainId !== 31337 && chainId !== 59140 };
        this.facade.loadTransactions(this.currentAccount, this.selectedSymbol === 'ETH');
      })
    );

    this.subscriptions.push(
      this.network$.subscribe(network => {
        this.network = network;
      })
    );

    this.subscriptions.push(
      this.currentAccount$.subscribe(account => {

        if(this.currentAccount === account) 
          return;

        this.currentAccount = account;
        
        if(this.currentAccount) {
          this.facade.getCurrentAccountBalance(this.currentAccount, true);
          this.facade.loadTransactions(this.currentAccount, this.selectedSymbol === 'ETH');
          this.startBalancePoller();
        }

      })
    );

    this.subscriptions.push(
      this.currentAccountBalance$.subscribe(balance => this.currentAccountBalance = balance)
    );

    this.subscriptions.push(
      this.accounts$.subscribe(accounts => this.accounts = accounts)
    );

    this.subscriptions.push(
      this.transactions$.subscribe(transactions => {
        this.transactions = transactions;
        setTimeout(() => {
          this.facade.getCurrentAccountBalance(this.currentAccount, this.selectedSymbol === 'ETH');
          this.facade.getAccounts();
        }, 5000);
      })
    );

    this.subscriptions.push(
      this.sendTransactionSuccessful$.subscribe(success => {
        this.sendTransactionSuccessful = success;
        if(success !== undefined) {
          this.displaySnackBar(success ? "Transaction Submitted" : "Transaction Failed");
        }
      })
    );

    this.subscriptions.push(
      this.networkRefreshOkay$.subscribe(okay => this.networkRefreshOkay = okay)
    );

    this.subscriptions.push(
      this.fetchCurrentAccountOkay$.subscribe(okay => this.fetchCurrentAccountOkay = okay)
    );

    this.subscriptions.push(
      this.fetchBalanceOkay$.subscribe(okay => this.fetchBalanceOkay = okay)
    );

    this.subscriptions.push(
      this.fetchAccountsOkay$.subscribe(okay => this.fetchAccountsOkay = okay)
    );

    this.subscriptions.push(
      this.fetchTransactionsOkay$.subscribe(okay => this.fetchTransactionsOkay = okay)
    );

    this.subscriptions.push(
      this.sendTransactionOkay$.subscribe(okay => this.sendTransactionOkay = okay)
    );

    this.subscriptions.push(
      this.networkRefreshError$.subscribe(error => this.networkRefreshError = error)
    );

    this.subscriptions.push(
      this.fetchCurrentAccountError$.subscribe(error => this.fetchCurrentAccountError = error)
    );

    this.subscriptions.push(
      this.fetchBalanceError$.subscribe(error => this.fetchBalanceError = error)
    );

    this.subscriptions.push(
      this.fetchAccountsError$.subscribe(error => this.fetchAccountsError = error)
    );

    this.subscriptions.push(
      this.fetchTransactionsError$.subscribe(error => this.fetchTransactionsError = error)
    );

    this.subscriptions.push(
      this.sendTransactionError$.subscribe(error => this.sendTransactionError = error)
    );

  }

  recognizeInteraction(): void {
    this.accountPollingCount = 0;
    this.balancePollingCount = 0;
  }

  startNetworkPoller(): void {
    this.pollingInterval = this.networkChainId === 31337 ? 5000 : 20000;
    this.networkPoller = interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => {
        this.maxPollingCount = this.networkChainId === 31337 ? 60 : 10;
        if(this.networkPollingCount >= this.maxPollingCount) {
          return of(EMPTY);
        }
        this.networkPollingCount++;
        this.facade.refreshNetwork();
        return of(EMPTY);
      }),
    ).subscribe();
  };

  startAccountPoller(): void {
    this.accountPoller = interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => {
        if(this.accountPollingCount >= this.maxPollingCount) {
          return of(EMPTY);
        }
        this.accountPollingCount++;
        this.facade.getCurrentAccount();
        return of(EMPTY);
      }),
    ).subscribe();
  }

  startBalancePoller(): void {
    this.balancePoller = interval(this.pollingInterval).pipe(
      startWith(0),
      switchMap(() => {
        if(this.balancePollingCount >= this.maxPollingCount) {
          return of(this.currentAccountBalance);
        }
        this.balancePollingCount++;
        return this.ethersProvider.getBalance(this.currentAccount, this.selectedSymbol === 'ETH'); 
      }),
    ).subscribe(balance => {
      this.currentAccountBalance = balance ?? "0.00";
    });
  }

  handleSymbolChange(selection: string): void {
    this.facade.getCurrentAccountBalance(this.currentAccount, selection === 'ETH');
    this.facade.loadTransactions(this.currentAccount, selection === 'ETH');
  }

  handleAccountChange(selection: string): void {
    if(selection === "ManualEntry") {
      this.sendTo = '';
      return;
    } 
    this.sendTo = selection;
  }

  clearButtonDisabled(): boolean {
    return this.sendTo === '' && ( this.sendAmount === '0.00' || !this.sendAmount ) && this.selectedAddress === '';
  }
  clear(): void {
    this.sendTo = '';
    this.sendAmount = '0.00';
    this.selectedAddress = '';
  }

  sendButtonDisabled(): boolean {
    return this.sendTo === '' || this.sendAmount === '0.00' || !this.sendAmount;
  }

  send(): void {
    this.facade.sendTransaction(this.selectedSymbol, this.currentAccount, this.sendTo, this.sendAmount);
    this.clear();
  }

  displaySnackBar(message: string): void {
    const snackBarRef = this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['pay-machine-snackbar']
    });
  }
  
}
