import { Component, input, model, OnDestroy, OnInit, signal } from '@angular/core';

// primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from "primeng/blockui"
import { AppSpinnerService } from './services/app-spinner.service';
import { Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'pb-app-spinner',
  imports: [ProgressSpinnerModule, BlockUIModule, AsyncPipe],
  templateUrl: './app-spinner.component.html',
  styleUrl: './app-spinner.component.scss',
  providers: []
})
export class AppSpinnerComponent {

  // Services
  public service:AppSpinnerService;

  constructor(service:AppSpinnerService) {
    this.service = service;
  }

}
