import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { ReactiveFormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common';
//import { Ejemplo1Component } from "./formularios/ejemplo1/ejemplo1.component";
//import { ZodiacoComponent } from './formularios/zodiaco/zodiaco.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],//Ejemplo1Component, ZodiacoComponent, ReactiveFormsModule, CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'angularSegundo';
}
