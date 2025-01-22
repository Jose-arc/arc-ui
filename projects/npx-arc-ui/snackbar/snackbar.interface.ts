import { SnackbarRef } from "./snackbar.service";

export default interface ISnackbarService{
    onSuccessMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig): SnackbarRef;
    onWarningMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig): SnackbarRef;
    onErrorMessage(message: string, position?: TYPE_POSITION[], extra?: SnackbarConfig): SnackbarRef;
    close(): void;
}

export class SnackbarConfig<D = any> {
    data?: D;
}

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';

type SUCCESS = typeof SUCCESS;
type WARNING = typeof WARNING;
type ERROR = typeof ERROR;

export type TYPE_SNACKBAR = SUCCESS | WARNING | ERROR;

export const TOP = 'top';
export const LEFT = 'left';
export const RIGHT = 'right';
export const BOTTOM = 'bottom';
export const CENTER = 'center';

type TOP = typeof TOP;
type LEFT = typeof LEFT;
type RIGHT = typeof RIGHT;
type BOTTOM = typeof BOTTOM;
type CENTER = typeof CENTER;

export type TYPE_POSITION = TOP | LEFT | RIGHT | BOTTOM | CENTER;