import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Registro {
  banda1: string;
  banda2: string;
  banda3: string;
  tolerancia: string;
  valorMinimo?: number;
  valorMaximo?: number;
  valorNominal?: number;
}

@Component({
  selector: 'app-resistencias',
  templateUrl: './resistencias.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./resistencias.component.css']
})
export default class ResistenciasComponent implements OnInit {
  colors: string[] = ['Negro', 'Café', 'Rojo', 'Naranja', 'Amarillo', 'Verde', 'Azul', 'Violeta', 'Gris', 'Blanco'];
  tolerancias: string[] = ['Oro', 'Plata'];

  formulario!: FormGroup;
  registros: Registro[] = [];
  resultados: { valor: number; valorMaximo: number; valorMinimo: number; registro: Registro }[] = [];
  mostrarRegistros: boolean = false;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      color1: new FormControl('', Validators.required),
      color2: new FormControl('', Validators.required),
      color3: new FormControl('', Validators.required),
      tolerancia: new FormControl('', Validators.required),
    });

    this.cargarRegistros();
    this.cargarResultados();
  }

  calcular(): void {
    const valorColor1 = this.colors.indexOf(this.formulario.get('color1')?.value);
    const valorColor2 = this.colors.indexOf(this.formulario.get('color2')?.value);
    const indiceMultiplicador = this.colors.indexOf(this.formulario.get('color3')?.value);
    
    if (valorColor1 === -1 || valorColor2 === -1 || indiceMultiplicador === -1) {
      console.error('Color no válido');
      return;
    }
  
    // Calcular el multiplicador basado en el índice
    const multiplicador = Math.pow(10, indiceMultiplicador);
  
    // Valor de la resistencia
    const valorNominal = (valorColor1 * 10 + valorColor2) * multiplicador; // Modificación aquí
  
    const tolerancia = this.formulario.get('tolerancia')?.value;
  
    // Factor de tolerancia
    const toleranceFactor = tolerancia === 'Oro' ? 0.05 : 0.10; // Tolerancia del 5% o 10%
  
    // valores máximos y mínimos
    const valorMaximo = valorNominal * (1 + toleranceFactor);
    const valorMinimo = valorNominal * (1 - toleranceFactor);
  
    // Crear un nuevo registro
    const nuevoRegistro: Registro = {
      banda1: this.formulario.get('color1')?.value,
      banda2: this.formulario.get('color2')?.value,
      banda3: this.formulario.get('color3')?.value,
      tolerancia: tolerancia,
      valorMinimo: valorMinimo,
      valorMaximo: valorMaximo,
      valorNominal: valorNominal,
    };
  
    this.registros.push(nuevoRegistro);
  
    // Almacenar resultados
    this.resultados.push({ valor: valorNominal, valorMaximo, valorMinimo, registro: nuevoRegistro });
  
    // Guardar registros y resultados en localStorage
    localStorage.setItem('registros', JSON.stringify(this.registros));
    localStorage.setItem('resultados', JSON.stringify(this.resultados));
  }
  

  imprimir(): void {
    this.mostrarRegistros = true;
  }

  cargarRegistros(): void {
    const registrosGuardados = localStorage.getItem('registros');
    if (registrosGuardados) {
      this.registros = JSON.parse(registrosGuardados);
    }
  }

  cargarResultados(): void {
    const resultadosGuardados = localStorage.getItem('resultados');
    if (resultadosGuardados) {
      this.resultados = JSON.parse(resultadosGuardados);
    }
  }

  getColorCode(color: string): string {
    switch (color) {
      case 'Negro': return 'black';
      case 'Café': return '#8B4513';
      case 'Rojo': return 'red';
      case 'Naranja': return 'orange';
      case 'Amarillo': return 'yellow';
      case 'Verde': return 'green';
      case 'Azul': return 'blue';
      case 'Violeta': return 'violet';
      case 'Gris': return 'gray';
      case 'Blanco': return 'white';
      default: return 'transparent';
    }
  }
}
