import { SnackbarComponent } from './snackbar.component';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarInjector } from './snackbar.injector';
import IServicioSnackbar, {
  ServicioConfiguracionSnackbar,
  ERROR,
  SUCCESS,
  WARNING,
  TIPO_SNACKBAR,
} from './snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicioSnackbar implements IServicioSnackbar {
  private snackbarComponentRef?: ComponentRef<SnackbarComponent>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private muestraMensaje(mensaje: string, tipo: TIPO_SNACKBAR, config?: ServicioConfiguracionSnackbar) {
    this.snackbarComponentRef && this.eliminaMensaje();
    const snackbarRef = this.appendDialogComponentToBody(config);
    if (this.snackbarComponentRef) {
      this.snackbarComponentRef.instance.mensaje = mensaje;
      this.snackbarComponentRef.instance.tipoAlerta = tipo;
    }
    return snackbarRef;
  }

  private appendDialogComponentToBody(config?: ServicioConfiguracionSnackbar) {
    const configuration = Object.assign({}, config);
    if(!config){
      if (configuration.data) {
        configuration.data.duracionMuestraMensaje = 5;
      }
    }
    const map = new WeakMap();
    map.set(ServicioConfiguracionSnackbar, configuration);

    const snackbarRef = new ServicioHelperSnackbar();
    map.set(ServicioHelperSnackbar, snackbarRef);

    const sub = snackbarRef.mensajeEliminado.subscribe(() => {
      // close the dialog
      this.eliminaMensaje();
      sub.unsubscribe();
    });

    const componentFactory =this.componentFactoryResolver.resolveComponentFactory(SnackbarComponent), 
    componentRef = componentFactory.create(new SnackbarInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbarComponentRef = componentRef;

    this.snackbarComponentRef.instance.eliminarMensaje
    .subscribe(() => {
      this.eliminaMensaje();
    });

    return snackbarRef;
  }

  eliminaMensaje(): void {
    if (this.snackbarComponentRef) {
      this.appRef.detachView(this.snackbarComponentRef.hostView);
      this.snackbarComponentRef.destroy();
    }
  }

  muestraMensajeExito(mensaje: string, extra?: ServicioConfiguracionSnackbar) {
    return this.muestraMensaje(mensaje, SUCCESS, extra);
  }
  muestraMensajeWarning(mensaje: string, extra?: ServicioConfiguracionSnackbar) {
    return this.muestraMensaje(mensaje, WARNING, extra);
  }
  muestraMensajeError(mensaje: string, extra?: ServicioConfiguracionSnackbar) {
    return this.muestraMensaje(mensaje, ERROR, extra);
  }
}

export class ServicioHelperSnackbar {
  constructor() {}

  eliminaMensaje(result?: any) {
    this._mensajeEliminado.next(result);
  }

  private readonly _mensajeEliminado = new Subject<any>();
  mensajeEliminado: Observable<any> = this._mensajeEliminado.asObservable();
}
