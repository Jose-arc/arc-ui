# ARC UI Library

Libreria modular con multiples componentes y servicios.

## Features

- Sistema de alertas
- Componente OTP (Factor de autenticación)
- Utils [Conjunto de funciones Vanilla Js]

## Instalación

Requiere una version compatible a angular 18 [Node.js](https://nodejs.org/)	^18.12 para desplegar.

Pasos de instalación.

```sh
npm i
```

## Módulos

| Módulos | Descripción |
| ------ | ------ |
| AlertComponent | Sistema de alerta de tipo snackbar |
| LoadingComponent | Componente de carga con logo retro |
| LoadingNewComponent | Componente de carga con logo nuevo |
| OTPComponent | Componente de factor de autenticación |


## Funciones

| Funciones | Descripción |
| ------ | ------ |
| replaceAll | Permite replazar multiples valores dentro de una cadena de texto |
| setLocalStorage | Permite almacenar informacion en el localstorage del navegador de manera temporal |
| getLocalStorage | Permite obtener un valor del localstorage |
| removeLocalStorage | Permite remover un elemento en especifico del localstorage |
| diffDays | Permite obtener la diferencia de dias entre 2 fechas |
| getToken | Método para obtener el token JWT decodificado y alojado en las cookies |
| toDataURL | Convierte una URL de un recurso en una cadena de datos en formato Base64 |
| uniquedID | Genera un codigo random de 19 caracteres |
| getCookie | Permite obtener el valor de una cookie almacenada en el navegador |
| setCookie | Permite almacenar informacion en cookies del navegador de manera temporal |
| deleteCookies | Permite eliminar informacion de las cookies del navegador segun el cname |
| deleteAllCookies | Elimina todas las cookies del navegador |
| cleanEmptyProperties | Permite limpiar las propiedad de un objeto que se encuentre vacio |
| downloadFileWithLink | Genera un elemento a link descargable |
| titleCase | Permite modificar la primera letra de un string |
| mutableObjectKeyTitleCase | Permite modificar la key de un objeto |
| isNullOrUndefined | Identifica si el objeto se encuentra null o undefined |
| copyToClipboard | Permite selecciona algun contenido y lo copia al portapapeles. |

## License

MIT
