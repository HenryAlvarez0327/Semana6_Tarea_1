import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  usuario = '';
  estado = 'Validando sesión...';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem('usuario') || '';
    const token = localStorage.getItem('token');

    if (!token) {
      this.estado = '❌ No hay sesión';
      this.cd.detectChanges();
      this.router.navigateByUrl('/');
      return;
    }

    this.http.get<any>('https://localhost:7246/api/Auth/validate', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.estado = '✅ Sesión válida (validada por backend)';
        if (res?.usuario) this.usuario = res.usuario;
        this.cd.detectChanges();
      },
      error: () => {
        this.estado = '❌ Sesión inválida';
        this.cd.detectChanges();
        localStorage.clear();
        this.router.navigateByUrl('/');
      }
    });
  }

  salir() {
    const token = localStorage.getItem('token') || '';

    this.http.post('https://localhost:7246/api/Auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigateByUrl('/');
      },
      error: () => {
        localStorage.clear();
        this.router.navigateByUrl('/');
      }
    });
  }
}
