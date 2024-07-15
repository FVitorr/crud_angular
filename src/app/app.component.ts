import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Certifique-se de usar 'styleUrls' no plural
})
export class AppComponent {
  title = 'Crud-Angular e Spring';

  constructor(private router: Router) {}  // Injeção do serviço Router

  toCidade() {
    this.router.navigate(['/cidade']);
  }

  toPessoa() {
    this.router.navigate(['/pessoa']);
  }
}
