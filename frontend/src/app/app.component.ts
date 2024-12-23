import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
}
