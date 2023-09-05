import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from "@angular/material/table";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { EthersProviderService } from './services/ethers-provider/ethers-provider.service';
import { PayMachineEffects } from './store/pay-machine.effects';
import { PayMachineFacade } from './store/pay-machine.facade';
import { payMachineReducer } from './store/pay-machine.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ payMachineState: payMachineReducer }, {}),
    EffectsModule.forRoot([PayMachineEffects]),
    FormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [
    EthersProviderService,
    PayMachineFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
