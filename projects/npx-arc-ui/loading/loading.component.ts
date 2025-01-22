import { Component, Input } from '@angular/core';
import { LOADING_ICON } from './loading.const';

@Component({
  selector: 'arc-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() muestraLoading: boolean = true;
  @Input() retro: boolean = false;
  @Input() mensaje: string = '';
  @Input() estilos?: {
    [k: string]: any;
  }

  getImageIcon(){
    return LOADING_ICON;  
  }

}
