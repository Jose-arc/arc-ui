/**
 * @description permite selecciona algun contenido y lo copia al portapapeles.
 * @param string contenido que se copiara en el portapapeles.
 */
function copyToClipboard(string: string){
    var input;
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = JSON.stringify(string);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
  /**
   * @description Identifica si el objeto se encuentra null o undefined
   * @param object elemento a consultar
   * @returns {boolean} 
   */
  function isNullOrUndefined(object: Object): boolean{
    return object === null || object === undefined
  }
  
  /**
   * @description Permite modificar la primera letra de un string
   * @param string 
   * @returns {string}
   */
  function titleCase(string: string) {
    var sentence = string.toLowerCase().split(" ");
    for(var i = 0; i< sentence.length; i++){
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
  }
  
  /**
   * @description Genera un elemento a link descargable
   * @param href ruta o link de referencia
   */
  function downloadFileWithLink(href: string | any) {
    var link = document.createElement("a");
    let name = (href?.split("/") || [])
    name = name[name?.length-1]
    link.setAttribute('download', name);
    link.href = href;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  
  /**
   * @Description Permite limpiar las propiedad de un objeto que se encuentre vacio
   * @param object objeto a limpiar
   * @returns { object }
   */
   function cleanEmptyProperties(object: any) {
      let value = object;
  
      if (typeof value === 'object' && !Array.isArray(value)) {
          value = Object.assign({}, value);
          Object.keys(value).forEach((key) => {
              const prop = value[key];
              if (!!prop || prop === 0 || prop === 1) {
                  if (typeof prop === 'object' && Object.keys(prop).length > 0 && !Array.isArray(prop)) {
                      value[key] = cleanEmptyProperties(prop);
                      if (Object.keys(value[key]).length === 0) {
                          delete value[key];
                      }
                  } else if (Array.isArray(prop)) {
                      value[key] = cleanEmptyProperties(prop);
                      if ((value[key] as any[]).length === 0) {
                          delete value[key];
                      }
                  } else if (value[key].toString().trim() === '') {
                      delete value[key];
                  }
              } else {
                  delete value[key];
              }
          });
      }
      if (Array.isArray(value)) {
          value = Array.of(...value);
          const newArray: any[] = [];
          value.forEach((p: unknown, i: any) => {
              if (typeof p === 'object' && !Array.isArray(p)) {
                  value[i] = cleanEmptyProperties(p);
  
                  if (Object.keys(value[i]).length !== 0) {
                      newArray.push(value[i]);
                  }
              } else if (Array.isArray(p)) {
                  value[i] = cleanEmptyProperties(p);
                  if ((value[i] as any[]).length !== 0) {
                      newArray.push(value[i]);
                  }
              } else if (value[i].toString().trim() !== '') {
                  newArray.push(value[i]);
              }
          });
          value = newArray;
      }
  
      return value;
  }
  
  /**
   * @description Permite replazar multiples valores dentro de una cadena de texto
   * @param value cadena de texto
   * @param repl1 valor que será remplazado
   * @param repl2 valor a sustituir en la cadena de texto
   * @returns {string}
   */
  function replaceAll(value: string, repl1: string, repl2: string) {
      return [...value].map(s => {
          s = s.replace(repl1, repl2);
          return s;
      }).join('');
  }
  
  /**
   * @description Permite obtener el valor de una cookie almacenada en el navegador
   * @param id identificador de la cookie
   * @returns {string}
   */
  function getCookie(id: string){
    let name = id + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  /**
   * Permite almacenar informacion en cookies del navegador de manera temporal
   * @param id identificador de la cookie
   * @param value data que se almacenara en la cookie
   * @param path ruta del navegador donde se almacena la cookie **Defecto /**
   * @param limitDays cantidad de dias limite que se registrara la cookie en el navegador
   */
  function setCookie(id: string, value: unknown, path?: string, limitDays?: number){
    var limit = new Date(), expires, val;
    limit.setTime(limit.getTime() + (limitDays || 1 * 24 * 60 * 60 * 1000));
    if (typeof value === 'object') {
      val = JSON.stringify(value);
    } else if(typeof value === 'number' || typeof value === 'boolean') {
      val = `${value}`;
    }
    else{
      val = value
    }
    expires = "expires="+limit.toUTCString();
    document.cookie = `${id}=${val};${expires};path=${path}`;
  }
  
  /**
   * @description Permite almacenar informacion en el localstorage del navegador de manera temporal
   * @param id identificador de la data en el localstorage
   * @param value data que se almacenara en el localstorage
   * @param limitDays cantidad de dias limite que se registrara en el localstorage
   */
  function setLocalStorage(id: string, value: unknown, limitDays?: number) {
      var limit, val, data_type;
      limit = new Date();
      limit.setDate(limit.getDate() + (limitDays || 1));
      if (typeof (value) === 'object') {
          val = JSON.stringify(value);
          data_type = "1";
      }
      else {
          data_type = "0";
          val = value;
      }
  
      window.localStorage.setItem(id, JSON.stringify({ data: val, expiration: limit, data_type }))
      window.dispatchEvent( new Event('storage') )
  }
  
  /**
   * @description permite obtener un valor del localstorage
   * @param id key del objeto alojado en el localstorage
   * @returns {T} elemento almacenado en el localstorage
   */
  function getLocalStorage<T = any>(id: string): { data: T, expiration: string, data_type: string } | null {
      var data, newData;
      data = window.localStorage.getItem(id);
      if (!data) return null;
      else {
          newData = JSON.parse(data) as { data: T, expiration: string, data_type: string };
          if (diffDays(new Date(newData.expiration)) > 0) {
              removeLocalStorage(id);
              return null;
          }
          else {
              if (newData.data && newData.data_type === '1') {
                  newData.data = JSON.parse(newData.data as any)
              }
          }
          return newData;
      }
  }
  
  /**
   * @description Permite remover un elemento en especifico del localstorage
   * @param id key del valor almacenado en el localstorage
   */
  function removeLocalStorage(id: string) {
      if (window.localStorage.getItem(id)) {
          window.localStorage.removeItem(id);
          window.dispatchEvent( new Event('storage') )
      }
  }
  
  /**
  * @description Permite obtener la diferencia de dias entre 2 fechas
  * @param firstDate fecha 1
  * @param lastDate fecha 2
  * @returns {number} cantidad de dias de diferencia
  */
  function diffDays(firstDate: Date | number, lastDate: Date = new Date()): number {
      var fechaInicio = new Date(firstDate).getTime();
      var fechaFin = new Date(lastDate).getTime();
  
      var diff = fechaFin - fechaInicio;
  
      return Math.round(diff / (1000 * 60 * 60 * 24));
  }
  
  /**
  * @description Método para obtener el token JWT decodificado y alojado en las cookies
  */
   function getToken<T>(token: string): T | null {
      var access_token = token;
  
      if (access_token === null || access_token === undefined) {
        return null;
      }
  
      let parts = access_token.split('.');
  
      if (parts.length !== 3) {
        throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
      }
  
      let decoded = urlBase64Decode(parts[1]);
      if (!decoded) {
        throw new Error('Cannot decode the token.');
      }
  
      return JSON.parse(decoded);
    }
  
    function urlBase64Decode(str: string): string {
      let output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: {
          break;
        }
        case 2: {
          output += '==';
          break;
        }
        case 3: {
          output += '=';
          break;
        }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return b64DecodeUnicode(output);
    }
  
    function b64decode(str: string): string {
      let chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let output: string = '';
  
      str = String(str).replace(/=+$/, '');
  
      if (str.length % 4 === 1) {
        throw new Error(
          "'atob' failed: The string to be decoded is not correctly encoded."
        );
      }
  
      for (
        // initialize result and counters
        let bc: number = 0, bs: any, buffer: any, idx: number = 0;
        // get next character
        (buffer = str.charAt(idx++));
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer &&
          (
            (bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4
          )
          ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
          : 0
      ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
      }
      return output;
    }
  
    function b64DecodeUnicode(str: any) {
      return decodeURIComponent(
        Array.prototype.map
          .call(b64decode(str), (c: any) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
    }
  
    function toDataURL(url: any, callback: any) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    }
  
    /**
     * @description Genera un codigo random de 19 caracteres
     * @returns {string} codigo formato string.
     */
    function uniquedID(){
      return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }
  
    function mutableObjectKeyTitleCase(data: any): {[key: string]: any}{
      let object: any = {}
      if(data instanceof Object){
        for(const key in data){
          const _key = titleCase(key);
          object[_key] = data[key]
        }
      }
      return object
    }
  
    /**
   * Permite eliminar informacion de las cookies del navegador segun el cname
   * @param cname identificador de las cookies
   * @returns 
   */
  function deleteCookies(cname: string){
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0 && (name.length != c.length)) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * @description elmina todas las cookies del navegador
   */
   function deleteAllCookies() {
    document.cookie.replace(
      /(?<=^|;).+?(?=\=|;|$)/g,
      name => location.hostname
        .split(/\.(?=[^\.]+\.)/)
        .reduceRight((acc: any, val, i, arr) => {
          if (i) arr[i] = '.' + val + acc;
          else arr[i] = '';
          return arr;
      }, [])
      .map((domain: string) => document.cookie=`${name}=;max-age=0;path=/;domain=${domain}`)
    );
   }
  
  
  export {
    replaceAll
    , setLocalStorage
    , getLocalStorage
    , removeLocalStorage
    , diffDays
    , getToken
    , toDataURL
    , uniquedID
    , getCookie
    , setCookie
    , deleteCookies
    , deleteAllCookies
    , cleanEmptyProperties
    , downloadFileWithLink
    , titleCase
    , mutableObjectKeyTitleCase
    , isNullOrUndefined
    , copyToClipboard
  }