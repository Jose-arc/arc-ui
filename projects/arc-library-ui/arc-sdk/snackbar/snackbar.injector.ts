import { InjectFlags, Injector, ProviderToken, InjectionToken } from '@angular/core';

export class SnackbarInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionalTokens: WeakMap<any, any>
  ) {}
  get<T>(
    token: ProviderToken<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  get(token: any, notFoundValue?: any): any;
  get(token: any, notFoundValue?: any, flags?: any): any {
    const value = this._additionalTokens.get(token);
    if (value) {
      return value;
    }
    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
