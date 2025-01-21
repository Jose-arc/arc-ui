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
import ISnackbarService, {
  SnackbarConfig,
  ERROR,
  SUCCESS,
  TYPE_POSITION,
  WARNING,
  TYPE_SNACKBAR,
} from './snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService implements ISnackbarService {
  private snackbarComponentRef?: ComponentRef<SnackbarComponent>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  private open(message: string, type: TYPE_SNACKBAR, position?: TYPE_POSITION[], config?: SnackbarConfig) {
    this.snackbarComponentRef && this.close();
    const snackbarRef = this.appendDialogComponentToBody(config);
    if (this.snackbarComponentRef) {
      this.snackbarComponentRef.instance.message = message;
      this.snackbarComponentRef.instance.type = type;
      this.snackbarComponentRef.instance.position = position;
    }
    return snackbarRef;
  }

  private appendDialogComponentToBody(config?: SnackbarConfig) {
    const map = new WeakMap();
    map.set(SnackbarConfig, config);

    const snackbarRef = new SnackbarRef();
    map.set(SnackbarRef, snackbarRef);

    const sub = snackbarRef.afterClosed.subscribe(() => {
      // close the dialog
      this.close();
      sub.unsubscribe();
    });

    const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(SnackbarComponent),
      componentRef = componentFactory.create(
        new SnackbarInjector(this.injector, map)
      );

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.snackbarComponentRef = componentRef;

    this.snackbarComponentRef.instance.onClose.subscribe(() => {
      this.close();
    });

    return snackbarRef;
  }

  close(): void {
    if (this.snackbarComponentRef) {
      this.appRef.detachView(this.snackbarComponentRef.hostView);
      this.snackbarComponentRef.destroy();
    }
  }

  onSuccessMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig) {
    return this.open(message, SUCCESS, position, extra);
  }
  onWarningMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig) {
    return this.open(message, WARNING, position, extra);
  }
  onErrorMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig) {
    return this.open(message, ERROR, position, extra);
  }
}

export class SnackbarRef {
  constructor() {}

  close(result?: any) {
    this._afterClosed.next(result);
  }

  private readonly _afterClosed = new Subject<any>();
  afterClosed: Observable<any> = this._afterClosed.asObservable();
}
