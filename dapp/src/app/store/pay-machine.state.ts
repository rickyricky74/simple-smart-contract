import { ITransaction } from "../models/transaction.model";

export interface PayMachineState {
    networkChainId: number;
    network: string;
    currentAccount: string;
    currentAccountBalance: string;
    accounts: string[];
    transactions: ITransaction[];
    sendTranactionSuccessful?: boolean;
    networkRefreshOkay: boolean;
    fetchCurrentAccountOkay: boolean;
    fetchBalanceOkay: boolean;
    fetchAccountsOkay: boolean;
    fetchTransactionsOkay: boolean;
    sendTransactionOkay: boolean;
    networkRefreshError: string;
    fetchCurrentAccountError: string;
    fetchBalanceError: string;
    fetchAccountsError: string;
    fetchTransactionsError: string;
    sendTransactionError: string;
}
