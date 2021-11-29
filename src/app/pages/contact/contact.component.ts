import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //ANADIR
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [DataService] 
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup; //ANADIR
  private emailRegex: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private fb: FormBuilder, private dataSvc: DataService) { }

  ngOnInit(): void {
    this.initForm();
  }

  async guardar():Promise<void> {
    if(this.contactForm.valid) {
      try {
        const formValue = this.contactForm.value;
        await this.dataSvc.onSaveContact(formValue);
        Swal.fire('Mensaje enviado', 'Nos vemos pronto', 'success');
        this.contactForm.reset();
      } catch (error) {
        alert(error);
      }
    }else {
      Swal.fire('Mensaje no enviado', 'Ocurrio un error', 'error');
    }
  }

  validarCampo(campo:string):string {
    const campoValidado = this.contactForm.get(campo);
    return (!campoValidado.valid && campoValidado.touched) ? 'is-invalid' : campoValidado.touched ? 'is-valid' : '';
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]]
    });
  }
}
