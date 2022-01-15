import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {
  
  miFormulario: FormGroup =  this.formBuilder.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]]
  })
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  
  validarCampo = (campo: string) => this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  guardar = () => {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched()
      return
    }
    console.log(this.miFormulario.value)
  }
  
  eliminar = (index: number) => {
    
  }

  agregarJuego = () => {

  }
}
