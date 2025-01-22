import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription, of, tap } from 'rxjs';
import { TYPE_POSITION, TYPE_SNACKBAR } from './snackbar.interface';
import { SnackbarRef } from './snackbar.service';
import { SNACKBAR_ERROR, SNACKBAR_SUCCESS, SNACKBAR_WARNING } from './snackbar.const';

@Component({
  selector: 'arc-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent  implements OnDestroy{
  private readonly _onClose = new Subject<any>();
  onClose = this._onClose.asObservable();
  @Input() message: string = '';
  @Input() type?: TYPE_SNACKBAR;
  @Input() position?: TYPE_POSITION[] = ['top', 'center'];
  title: string = '';
  active: boolean = true;
  icon: string = `assets/${this.type}.svg`;
  subscription?: Subscription
  private sanckbarRef = new SnackbarRef();
  constructor() {
    setTimeout(() => this.onStartUp());
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onOverlayClicked(evt: MouseEvent) {
    if(!this.subscription){
      this.close();
    }
  }

  getImageIcon(){
    switch (this.type) {
      case 'error':
        return SNACKBAR_ERROR;
      case 'warning':
        return SNACKBAR_WARNING;
      default:
        return SNACKBAR_SUCCESS;
    }
  }

  onAlertClicked(evt: MouseEvent) {
    evt.stopPropagation();
    var input;
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = this.message;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  close() {
    if(!this.subscription){
      this.active = !this.active;
      this.subscription = of(0)
        .pipe(
          tap({
            next: () => {
              this.sanckbarRef.close();
            },
          })
        )
        .subscribe();
    }
  }

  private onStartUp() {
    switch (this.type) {
      case 'warning':
        this.title = '¡Advertencia!';
        break;

      case 'success':
        this.title = '¡Éxito!';
        break;

      case 'error':
        this.title = '¡Error!';
        break;
    }
  }
}