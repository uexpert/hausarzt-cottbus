import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactInfosComponent } from '../../components/contact-infos/contact-infos.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-contact',
  imports: [CommonModule, ContactInfosComponent, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

}
