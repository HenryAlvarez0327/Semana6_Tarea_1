import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ IMPORTANTE
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ IMPORTANTE
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';
  cargando = false;

  constructor(private http: HttpClient, private router: Router) {}

  entrar() {
    this.cargando = true;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.http.post<any>('https://localhost:7246/api/Auth/login', {
      usuario: this.usuario,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('usuario', res.usuario);
        localStorage.setItem('token', res.token);

        this.cargando = false;
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log('LOGIN ERROR =>', err);
        this.cargando = false;
        alert('Credenciales incorrectas');
      }
    });
  }
}
