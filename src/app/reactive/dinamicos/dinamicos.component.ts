import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {
  
  miFormulario: FormGroup =  this.formBuilder.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array( [
      ['Metal Gear'],
      ['Resident evil']
    ], Validators.required)
  });

  nuevoFavorito: FormControl =  this.formBuilder.control('', Validators.required);
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

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
    this.favoritosArr.removeAt(index)
  }

  agregarJuego = () => {
    if (this.nuevoFavorito.invalid) {
      return
    }
    
    // this.favoritosArr.push(new FormControl( this.nuevoFavorito.value, Validators.required));
    this.favoritosArr.push( this.formBuilder.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }
}
