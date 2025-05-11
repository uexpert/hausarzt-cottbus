import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressMapComponent } from '../../components/address-map/address-map.component';

@Component({
  selector: 'page-arrival',
  imports: [CommonModule, AddressMapComponent],
  templateUrl: './arrival.component.html',
  styleUrl: './arrival.component.scss'
})
export class ArrivalComponent {

}
