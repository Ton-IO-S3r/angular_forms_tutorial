import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {
  
  @ViewChild('myForm') miFormulario!: NgForm; 
  constructor() { }

  ngOnInit(): void {
  }

  guardar = () => {
    console.log(this.miFormulario)
  }

  validateProductName = (): boolean => {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched
  }

  validateProductPrice = (): boolean => {
    return this.miFormulario?.controls['precio']?.value < 0 && this.miFormulario?.controls['precio']?.touched
  }


}
