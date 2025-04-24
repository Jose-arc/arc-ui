import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, interval, fromEvent, merge, Subscription } from 'rxjs';
import { switchMap, take, filter, mapTo, startWith } from 'rxjs/operators';

import { ERROR, ServicioConfiguracionSnackbar, SUCCESS, TIPO_SNACKBAR, WARNING } from './snackbar.interface';
import { ServicioHelperSnackbar } from './snackbar.service';
import { ICONO_SNACKBAR_ERROR, ICONO_SNACKBAR_SUCCESS, ICONO_SNACKBAR_WARNING, SELECTOR_CONTENEDOR_SNACKBAR } from './snackbar.const';

@Component({
  selector: 'arc-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent implements OnInit, OnDestroy{
  private readonly _eliminarMensaje = new Subject<any>();
  eliminarMensaje = this._eliminarMensaje.asObservable();
  @Input() mensaje: string = '';
  @Input() tipoAlerta: TIPO_SNACKBAR = SUCCESS;
  muestraMensaje: boolean = true;
  subscription?: Subscription;
  subscriptionContador?: Subscription;
  private sanckbarRef = new ServicioHelperSnackbar();
  pausado = false;
  iniciar$ = new Subject<void>();
  pausar$ = new Subject<void>();
  duracion: number;

  constructor(private config: ServicioConfiguracionSnackbar){
    this.duracion = config.data?.duracionMuestraMensaje || 5;
  }

  ngOnInit(): void {
    const contador$ = this.iniciar$.pipe(
      switchMap(() => interval(1000).pipe(
        take(this.duracion)
        , filter(() => !this.pausado)
      ))
    );

    const alertaDOM = document.getElementById(SELECTOR_CONTENEDOR_SNACKBAR);
    if(alertaDOM){
      //Se mantiene escuchando ante cualquier evento del mouse sobre el mensaje
      const mouseEnter$ = fromEvent(alertaDOM, 'mouseenter').pipe(mapTo(true)); 
      const mouseLeave$ = fromEvent(alertaDOM, 'mouseleave').pipe(mapTo(false));
      merge(mouseEnter$, mouseLeave$)
      .pipe(
        startWith(false)
      )
      .subscribe(pausado =>{
        this.pausado = pausado;
        if(pausado){
          this.pausarContador();
        }
        else{
          this.iniciarContador();
        }
      })
      
      this.subscriptionContador = contador$
      .subscribe({
        next: (value: number) => {
          const ocultaMensaje = value === (this.duracion - 1);
          if(ocultaMensaje){
            this.eliminaMensaje();
          }
        }
      });
      this.iniciarContador();
    } 
    else{
      console.log('No se ha encontrado elementos en el DOM');
    }

  }

  iniciarContador():void{
    this.pausado = false;
    this.iniciar$.next();
  }

  pausarContador(): void{
    this.pausado = true;
    this.pausar$.next();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionContador?.unsubscribe();
  }

  onOverlayClicked(evt: MouseEvent) {
    if(!this.subscription){
      this.eliminaMensaje();
    }
  }

  muestraTitulo() {
    switch (this.tipoAlerta) {
      case WARNING:
        return '¡Advertencia!';
      case SUCCESS:
        return '¡Éxito!';
      case ERROR:
        return '¡Error!';
    }
  }

  muestraIcono(){
    switch (this.tipoAlerta) {
      case 'error':
        return ICONO_SNACKBAR_ERROR;
      case 'warning':
        return ICONO_SNACKBAR_WARNING;
      default:
        return ICONO_SNACKBAR_SUCCESS;
    }
  }

  copiaMensaje(evt: MouseEvent) {
    evt.stopPropagation();
    var input;
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = this.mensaje;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  eliminaMensaje() {
    if(!this.subscription){
      this.muestraMensaje = !this.muestraMensaje;
      this.sanckbarRef.eliminaMensaje();
    }
  }
}