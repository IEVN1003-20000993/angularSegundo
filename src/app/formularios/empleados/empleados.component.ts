import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: string;
  nombre: string;
  edad: number;
  email: string;
  horas: number; 
  horasPagar: number; 
  pagoHoras: number; 
  horasExtras: number; 
  pagoExtras: number; 
  totalPagar: number; 
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleados.component.html',
})
export default class EmpleadosComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];
  empleadoSeleccionado: Empleado | null = null;
  mostrarTotal: boolean = false;
  totalAPagar: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      edad: [''],
      email: [''],
      horas: ['']
    });
  }

  onSubmit() {
    const nuevoEmpleado: Empleado = this.formGroup.value;
    this.guardarEmpleado(nuevoEmpleado);
    this.formGroup.reset();
  }

  guardarEmpleado(empleado: Empleado) {
    const horas = empleado.horas;
    const { horasPagar, pagoHoras, horasExtras, pagoExtras, totalPagar } = this.calcularPago(horas);
    empleado.horasPagar = horasPagar;
    empleado.pagoHoras = pagoHoras;
    empleado.horasExtras = horasExtras;
    empleado.pagoExtras = pagoExtras;
    empleado.totalPagar = totalPagar;

    localStorage.setItem(empleado.matricula, JSON.stringify(empleado));
  }

  imprimir() {
    this.cargarEmpleados();
    console.log(this.empleados);
    this.calcularTotalAPagar(); 
    this.mostrarTotal = true; 
  }

  calcularTotalAPagar() {
    this.totalAPagar = this.empleados.reduce((total, empleado) => total + empleado.totalPagar, 0);
  }

  cargarEmpleados() {
    this.empleados = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const empleadoGuardado = localStorage.getItem(key);
        if (empleadoGuardado) {
          this.empleados.push(JSON.parse(empleadoGuardado));
        }
      }
    }
  }

  buscarEmpleado() {
    const matricula = prompt('Ingrese la matrícula del empleado para modificar:');
    const empleado = this.empleados.find(e => e.matricula === matricula);
    if (empleado) {
      this.formGroup.patchValue(empleado);
      this.empleadoSeleccionado = empleado;
    } else {
      alert('Empleado no encontrado, verifica la matrícula.');
    }
  }

  eliminarEmpleado() {
    if (this.empleadoSeleccionado) {
      localStorage.removeItem(this.empleadoSeleccionado.matricula);
      this.cargarEmpleados();
      this.empleadoSeleccionado = null;
    }
  }

  calcularPago(horas: number): { horasPagar: number, pagoHoras: number, horasExtras: number, pagoExtras: number, totalPagar: number } {
    const pagoPorHora = 70;
    const pagoExtra = 140;
    let horasPagar = horas;
    let horasExtras = 0;
    let pagoHoras = 0;
    let pagoExtras = 0;

    if (horas > 40) {
      horasPagar = 40; 
      horasExtras = horas - 40; 
      pagoHoras = horasPagar * pagoPorHora; 
      pagoExtras = horasExtras * pagoExtra; 
    } else {
      pagoHoras = horas * pagoPorHora; 
    }

    const totalPagar = pagoHoras + pagoExtras; 
    return { horasPagar, pagoHoras, horasExtras, pagoExtras, totalPagar };
  }
}
