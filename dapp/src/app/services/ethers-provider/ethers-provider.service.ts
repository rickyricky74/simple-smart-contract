import { Injectable, OnInit } from '@angular/core';
import { PayableOverrides } from 'ethers';
import * as ethers from 'ethers';
import { Subscription, Observable, from, Subject, of } from 'rxjs';
import { ITransaction } from '../../models/transaction.model';
import { PayMachine__factory } from '../../models/abi/factories/PayMachine__factory';
import { PayMachine } from '../../models/abi/PayMachine';
import { SomeToken__factory } from '../../models/abi/factories/SomeToken__factory';
import { SomeToken } from '../../models/abi/SomeToken';

@Injectable({
  providedIn: 'root'
})
export class EthersProviderService implements OnInit {
  // TODO: Inject these vars
  localhostUrl = 'http://localhost:8545';
  testnetUrl = 'https://rpc.goerli.linea.build';
  networkUrl = this.localhostUrl;
  networkSupported = true;
  networkChainId = 31337;
  someTokenSymbol = 'SMTKN';

  subscriptions: Subscription[] = [];

  web3Provider: ethers.providers.Web3Provider;
  provider?: ethers.providers.JsonRpcProvider;
  signer?: ethers.Signer;
  contractAbi: any; 
  contract?: ethers.Contract;
  payMachine?: PayMachine;
  erc20?: SomeToken;

  ethTransactionEmitter: Subject<ITransaction> = new Subject<ITransaction>();
  ethTransactions$: Observable<ITransaction> = this.ethTransactionEmitter.asObservable();

  tokenTransactionEmitter: Subject<ITransaction> = new Subject<ITransaction>();
  tokenTransactions$: Observable<ITransaction> = this.tokenTransactionEmitter.asObservable();

  constructor() { 

    this.contractAbi = PayMachine__factory.abi;

    let w: any = (window as any);
    this.web3Provider = new ethers.providers.Web3Provider(w.ethereum);
    this.signer = this.web3Provider.getSigner();

    try {
      this.provider = new ethers.providers.JsonRpcProvider();
      this.initializeContracts();
    } catch(err) {
      console.log(`EthersProviderService() Error: ${err}`);
    }
    
  }

  ngOnInit(): void { }

  get payMachineAddress(): string {
    return this.networkChainId === 31337 ? '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512' : '0xD61DbCc1FC10f6255c25B53a0c8826aB1833EB17';
  }

  get someTokenAddress(): string {
    return this.networkChainId === 31337 ? '0x5FbDB2315678afecb367f032d93F642f64180aa3' : '0x7eEcB2CDe57e098E8936Bb315C5368cbe0660d8d';
  }

  initializeContracts(): void {
    this.contract = undefined;
    this.payMachine = undefined;
    this.erc20 = undefined;

    if(!this.web3Provider || !this.signer || !this.networkSupported) return;

    this.contract = new ethers.Contract(this.payMachineAddress, this.contractAbi, this.provider);
    this.contract.connect(this.signer);
    this.payMachine = new PayMachine__factory(this.signer).attach(this.payMachineAddress);
    this.erc20 = new SomeToken__factory(this.signer).attach(this.someTokenAddress);
  }

  refreshNetwork(): Observable<number | void> {

    return from(this.web3Provider.getNetwork()
      .then(network => { 

        console.log(`Network: ${JSON.stringify(network)}`); 

        try {

          this.updateNetwork(network.chainId);

        } catch(err) {
          let e = err as any;
          
          if(e.toString().includes("underlying network changed")) {
            window.location.reload();
          }
          
          console.log(`refreshNetwork() Error: ${err}`);
          throw "Unable to detect network";
        }

        return network.chainId;
      })
      .catch(err => {
        let e = err as any;
          
        if(e.toString().includes("underlying network changed")) {
          window.location.reload();
        }

        console.log(`refreshNetwork() Error: ${err}`);
        throw "Cannot connect to network";
      })
    );
    
  }

  updateNetwork(chainId: number) {
    
    this.networkChainId = chainId;

    this.networkUrl = 
    chainId === 31337 ? this.localhostUrl 
      : chainId === 59140 ? this.testnetUrl 
      : "";

    this.networkSupported = chainId === 31337 || chainId === 59140;

    if(this.networkSupported) {
      this.provider = new ethers.providers.JsonRpcProvider(this.networkUrl);
    }

    this.initializeContracts();
  }

  getAccount(): Observable<string | void> {

    if(!this.signer) return of("");

    let account = "";

    return from(this.signer.getAddress()
      .then(address => {
        account = address;
        return account;
      })
      .catch(err => {
        console.log(`getAccount() Error: ${err}`);
        throw "Unable to discover connected account or account not connected";
      })
    )

  }

  getBalance(account: string, forEth: boolean = true): Observable<string | void> {

    if(!this.provider || !this.networkSupported || !this.erc20) return of("0");

    let balance: string = "";

    if(forEth) {
      return from(this.provider.getBalance(account)
        .then(bal => {
          balance = ethers.utils.formatEther(bal);
          return balance;
        })
        .catch(err => {
          console.log(`getBalance() Error: ${err}`);
          throw "Unable to get ETH balance";
        })
      );
    }

    return from(this.erc20.balanceOf(account)
      .then((bal: any) => {
        balance = ethers.utils.formatEther(bal);
        return balance;
      })
      .catch((err: any) => {
        console.log(`getBalance() Error: ${err}`);
        throw "Unable to get token balance";
      })
    );

  }

  getAccounts(): Observable<string[] | void> {

    if(!this.provider || !this.networkSupported) return of([]);

    let accounts: string[] = [];

    return from(this.web3Provider.listAccounts()
      .then((accs: string[]) => {
        accounts = accs;
        return accounts;
      })
      .catch(err => {
        console.log(`getAccounts() Error: ${err}`);
        throw err;
      })
    )

  }

  sendTransaction(transaction: ITransaction): Observable<ITransaction | void> {
      
      if(!this.signer || !this.payMachine || !this.erc20) return of();
  
      if(transaction.symbol === 'ETH') {

        let overrides: PayableOverrides = {
          value: ethers.utils.parseEther(transaction.amount)
        };

        return from(this.payMachine.transferEth(transaction.to, overrides)
          .then(() => transaction)
          .catch((err: any) => {
            console.log(`sendTransaction() Error: ${err}`);
            throw err;
          })
        );

      }

      return from(this.erc20.approve(this.payMachineAddress, ethers.utils.parseEther(transaction.amount))
        .then(() => {
          if(!this.payMachine) return;
          this.payMachine.transferToken(this.someTokenAddress, transaction.to, ethers.utils.parseEther(transaction.amount))
          .then(() => transaction)
          .catch((err: any) => {
            console.log(`sendTransaction() Error: ${err}`);
            throw err;
          })
        })
      .catch((err: any) => {
        console.log(`erc20.approve() Error: ${err}`);
        throw err;
      })
    )     
  
  }

  getTransactions(account: string, forEth: boolean): Observable<ITransaction[]> {
    
    if(!account || !this.contract) return of([] as ITransaction[]);

    let eventName: string = forEth ? "TransferEth" : "TransferToken";
    let symbol: string = forEth ? "ETH" : this.someTokenSymbol;

    let filterFrom = this.contract.filters[eventName](account, null, null);
    let filterTo = this.contract.filters[eventName](null, account, null);
    let transactions: ITransaction[] = [];

    if (!account) return of(transactions);

    let result = this.contract.queryFilter(filterFrom)
      .then(events => {
        events.forEach(event => {
          const r: ethers.utils.Result | undefined = (event as ethers.Event).args; 
          if(!r) return;
          const from = r["sender"];
          const to = r["recipient"];
          const amount = ethers.utils.formatEther(r["amount"]);
          let tx = { symbol: symbol, from: from, to: to, amount: amount } as ITransaction;
          transactions = [...transactions, tx]; 
        });
      })
      .then(async () => {
        await this.contract?.queryFilter(filterTo).then(events => {
          events.forEach(event => {
            const r: ethers.utils.Result | undefined = (event as ethers.Event).args; 
            if(!r) return;
            const from = r["sender"];
            const to = r["recipient"];
            const amount = ethers.utils.formatEther(r["amount"])
            let tx = { symbol: symbol, from: from, to: to, amount: amount } as ITransaction;
            transactions = [...transactions, tx];
          });
        })
      .catch(err => { 
        console.log(`getTransactions() Error: ${err}`); 
        throw "Error: Unable to fetch transactions";
      })

        return transactions;
      })

    return from(result);

  }


}

/*
    event TransferEth(address indexed sender, address indexed recipient, uint256 amount);
    event TransferToken(address indexed tokenAddress, address indexed sender, address indexed recipient, uint256 amount);
*/