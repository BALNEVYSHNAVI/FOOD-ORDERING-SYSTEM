import { Component } from '@angular/core';
import { MenuCardComponent } from "../../components/menu-card/menu-card.component";

@Component({
  selector: 'app-home',
  imports: [MenuCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
