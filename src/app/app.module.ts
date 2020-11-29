import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OvenComponent } from './components/oven/oven.component';

import { QRCodeModule } from 'angular2-qrcode';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { FooterComponent } from './components/footer/footer.component';
import { MessageService } from 'primeng/api';
import { NameComponent } from './components/name/name.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { BakeComponent } from './components/bake/bake.component';
import { RunComponent } from './components/run/run.component';
import { OldOvenComponent } from './components/old-oven/old-oven.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    OvenComponent,
    FooterComponent,
    NameComponent,
    IngredientsComponent,
    BakeComponent,
    RunComponent,
    OldOvenComponent,
    StartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    HttpClientModule,
    InputSwitchModule,
    InputTextModule,
    QRCodeModule,
    ToastModule,
    TooltipModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
