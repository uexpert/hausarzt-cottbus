import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactInfosComponent } from '../../components/contact-infos/contact-infos.component';

@Component({
  selector: 'page-contact',
  imports: [CommonModule, ContactInfosComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

}
