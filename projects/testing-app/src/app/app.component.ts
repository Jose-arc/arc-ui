import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from 'npx-arc-ui/loading';
import { OtpComponent } from 'npx-arc-ui/otp-input';
import { SnackbarService } from 'npx-arc-ui/snackbar';
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
  constructor(
    private snackbar: SnackbarService
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
    const ref = this.snackbar.onSuccessMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut iaculis ipsum. Vestibulum vitae gravida felis. In et elit non elit scelerisque suscipit. Quisque id volutpat ligula. Nullam lectus.');
      ref.afterClosed.subscribe(c =>{
        console.log('Se cerro perfect');
      })
  }

  onError(){
    const ref = this.snackbar.onErrorMessage('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mollis pretium quis.');
    ref.afterClosed.subscribe(c =>{
      console.log('Se cerro perfect');
    })
  }

  onWarning(){
    const ref = this.snackbar.onWarningMessage('que sucede señores');
    ref.afterClosed.subscribe(c =>{
      console.log('Se cerro perfect');
    })
  }
}
