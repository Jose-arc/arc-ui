# NPX-ARC-UI ![Static Badge](https://img.shields.io/badge/licence%20-%20MIT%20-%20sky%20blue) ![Static Badge](https://img.shields.io/badge/npm%20-%20v18.2.8%20-%20blue)

Librería múltiples componentes y servicios.

# Features

- Sistema de alertas
- Componente OTP (Factor de autenticación)
- Componente de carga
- Utils [Conjunto de funciones Vanilla Js]

# Instalación
> Requiere una versión compatible a angular 18 [Node.js](https://nodejs.org/)	^18.12 para desplegar.

*__Pasos de instalación.__*

```sh
npm i npx-arc-ui
```

# Módulos
---
### Loading
*__Uso Básico__*
```html
<arc-loading 
    [muestraLoading]="true">
</arc-loading>
```

*__Uso Avanzado__*
```html
<arc-loading 
    [retro]="true" 
    [muestraLoading]="true" 
    mensaje="Esto es un mensaje de pruebas">
</arc-loading>
```

*__Todas las opciones__*
- `[muestraLoading]` - Muestra el componente loading
- `[mensaje]` - Texto que se añade a loading en pantalla
- `[retro]` - Cambio de imagen con logo antiguo

---
### OTP
 *__Uso Básico__*
```html
<arc-otp-input 
    [length]="5" 
    [isPasswordInput]="false" 
    formControlName="code">
</arc-otp-input>
```

*__Uso Avanzado__*
```html
<arc-otp-input 
    [length]="5" 
    [isPasswordInput]="false" 
    [inputStyles]="{
        "color": "#333"
    }"
    [containerStyles]="{
        "color": "#333"
    }"
    [allowNumbersOnly]="true"
    [disableAutoFocus]="false"
    placeholder="pruebas"
    formControlName="code">
</arc-otp-input>
```

*__Todas las opciones__*
- `[length]` - Muestra la cantidad de campos necesarios
- `[isPasswordInput]` - Define el tipo de casilla de texto si es text | tel | password
- `[inputStyles]` - Permite modificar el diseño de cada campo de texto
- `[containerStyles]` - Permite modificar el diseño del contenedor donde se encuentran los campos de textos
- `[allowNumbersOnly]` - Permite solamente numeros
- `[disableAutoFocus]` - Deshabilita el foco en la casilla de texto
- `[placeholder]` - Texto en cada casilla de texto
- `formControlName` - FormControl en caso que se utilice formularios reactivos

---

### Snackbar
*__Uso__*
```typescript
constructor(
    private snackbar: SnackbarService
)

onSucess(){
    const ref = this.snackbar.onSuccessMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut iaculis ipsum. Vestibulum vitae gravida felis. In et elit non elit scelerisque suscipit. Quisque id volutpat ligula. Nullam lectus.');
      ref.afterClosed.subscribe(c =>{
        console.log('Se cerro snackbar');
      })
  }

  onError(){
    const ref = this.snackbar.onErrorMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis pretium quis.');
    ref.afterClosed.subscribe(c =>{
      console.log('Se cerro snackbar');
    })
  }

  onWarning(){
    const ref = this.snackbar.onWarningMessage('que sucede señores');
    ref.afterClosed.subscribe(c =>{
      console.log('Se cerro snackbar');
    })
  }
```
---
## Funciones

| Funciones | Descripción |
| ------ | ------ |
| replaceAll | Permite remplazar múltiples valores dentro de una cadena de texto |
| setLocalStorage | Permite almacenar información en el localstorage del navegador de manera temporal |
| getLocalStorage | Permite obtener un valor del localstorage |
| removeLocalStorage | Permite remover un elemento en especifico del localstorage |
| diffDays | Permite obtener la diferencia de días entre 2 fechas |
| getToken | Método para obtener el token JWT decodificado y alojado en las cookies |
| toDataURL | Convierte una URL de un recurso en una cadena de datos en formato Base64 |
| uniquedID | Genera un código random de 19 caracteres |
| getCookie | Permite obtener el valor de una cookie almacenada en el navegador |
| setCookie | Permite almacenar información en cookies del navegador de manera temporal |
| deleteCookies | Permite eliminar información de las cookies del navegador según el cname |
| deleteAllCookies | Elimina todas las cookies del navegador |
| cleanEmptyProperties | Permite limpiar las propiedad de un objeto que se encuentre vacío |
| downloadFileWithLink | Genera un elemento a link descargable |
| titleCase | Permite modificar la primera letra de un string |
| mutableObjectKeyTitleCase | Permite modificar la key de un objeto |
| isNullOrUndefined | Identifica si el objeto se encuentra null o undefined |
| copyToClipboard | Permite selecciona algún contenido y lo copia al portapapeles. |

## License

MIT
