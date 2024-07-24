import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VendeursServiceService } from 'src/Service/vendeurs-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  form!: FormGroup;
  verifEdit: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vendeurService: VendeursServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.verifEdit = true;
      console.log(this.data);
      this.initForm2();
    }
  }

  initForm2(): void {
    this.form = new FormGroup({
      title: new FormControl(this.data?.title, [Validators.required]),
      adresse: new FormControl(this.data?.adresse, [Validators.required]),
      telephone: new FormControl(this.data?.telephone, [Validators.required]),
      email: new FormControl(this.data?.email, [Validators.required]),
      taxe: new FormControl(this.data?.taxe, [Validators.required]),
    });
  }

  confirm() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.vendeurService.confirm(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/vendeur').then(()=>{
          location.reload()
        })    
        });
    } else {
      this.dialogRef.close(this.form.value);
      this.vendeurService.edit(this.form.value, this.data?.id).subscribe(() => {
        this.router.navigateByUrl('/vendeur').then(()=>{
          location.reload()
        })    
        });
    
    
  }}

  close(): void {
    this.dialogRef.close();
  }
}
