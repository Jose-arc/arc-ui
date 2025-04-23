import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from 'npx-arc-ui/loading';
import { OtpComponent } from 'npx-arc-ui/otp-input';
import { ServicioSnackbar } from 'npx-arc-ui/snackbar';
import { getCookie } from 'npx-arc-ui/utils';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    OtpComponent
    , LoadingComponent
    , ReactiveFormsModule
    , CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testing-app';
  form = new FormGroup({ code: new FormControl('') })
  interval: any;
  limit = 3;
  constructor(
    private snackbar: ServicioSnackbar
  ){
    setTimeout(() => {
      try {
        const cookie = getCookie('access_token');
      } catch (error) {
        throw new Error('No se encontro la cookie');
      }
    }, 1000);

  }

  onSucess(){
    const ref = this.snackbar.muestraMensajeExito('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut iaculis ipsum. Vestibulum vitae gravida felis. In et elit non elit scelerisque suscipit. Quisque id volutpat ligula. Nullam lectus.', { data: { duracionMuestraMensaje: 10 } });
      ref.mensajeEliminado.subscribe(c =>{
        console.log('Se cerro perfect');
      })
  }

  onError(){
    const ref = this.snackbar.muestraMensajeError('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis pretium quis.');
    ref.mensajeEliminado.subscribe(c =>{
      console.log('Se cerro perfect');
    })
  }

  onWarning(){
    const ref = this.snackbar.muestraMensajeWarning('que sucede señores');
    ref.mensajeEliminado.subscribe(c =>{
      console.log('Se cerro perfect');
    })
  }
}
