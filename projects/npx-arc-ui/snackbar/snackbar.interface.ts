import { ServicioHelperSnackbar } from "./snackbar.service";

export default interface IServicioSnackbar{
    muestraMensajeExito(mensaje: string, extra?: ServicioConfiguracionSnackbar): ServicioHelperSnackbar;
    muestraMensajeWarning(mensaje: string, extra?: ServicioConfiguracionSnackbar): ServicioHelperSnackbar;
    muestraMensajeError(mensaje: string, extra?: ServicioConfiguracionSnackbar): ServicioHelperSnackbar;
    eliminaMensaje(): void;
}

export class ServicioConfiguracionSnackbar<D = IPropiedadesConfiguracionSnackbar> {
    data?: D;
}

interface IPropiedadesConfiguracionSnackbar{
    [key:string]: any;
    duracionMuestraMensaje: number;
}

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';

type SUCCESS = typeof SUCCESS;
type WARNING = typeof WARNING;
type ERROR = typeof ERROR;

export type TIPO_SNACKBAR = SUCCESS | WARNING | ERROR;