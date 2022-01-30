import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  get emailErrorMsg(): string{
    const errors =  this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'El email es obligatorio.'
    } else if (errors?.['pattern']){
      return 'El valor ingresado no tiene un formato válido.'
    } else if (errors?.['emailExists']){
      return 'Este email ya está registrado, elige otro.'
    } 
    return ''
  }

  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern) ] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [this.emailValidator] ],
    username: ['', [Validators.required, this.validatorService.validarUsernameExistente ] ],
    password: ['', [Validators.required, Validators.minLength(6) ] ],
    confirmarPassword: ['', [Validators.required ] ],
  },{
    validators: [this.validatorService.camposIguales('password', 'confirmarPassword')]
  })

  constructor( private formBuilder: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Antonio Servin',
      email: 'test@test.com',
      username: 'user1',
      password: '123456',
      confirmarPassword: '123456'
    })
  }

  validarCampo = ( campo: string ) => this.miFormulario.get(campo)?.invalid &&  this.miFormulario.get(campo)?.touched;

 emailValidateRequired = () => this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched;
  



  submitForm = () => {
    if (!this.miFormulario.valid) {
      this.miFormulario.markAllAsTouched()
      return
    }
    console.log(this.miFormulario.value)
  }

}
