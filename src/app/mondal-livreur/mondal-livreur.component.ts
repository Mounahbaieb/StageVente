import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LivreurService } from 'src/Service/livreur.service';

@Component({
  selector: 'app-mondal-livreur',
  templateUrl: './mondal-livreur.component.html',
  styleUrls: ['./mondal-livreur.component.css']
})
export class MondalLivreurComponent implements OnInit {
  form!: FormGroup;
  verifEdit: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<MondalLivreurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private LivreurService: LivreurService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (this.data) {
      this.verifEdit = true;
      console.log(this.data);
      this.initForm2();
    } else {
      this.verifEdit = false;
      this.initForm();
    }
  }
  
  initForm(): void {
    this.form = new FormGroup({
      identifiant: new FormControl(null, [Validators.required]),
      NomPrenom: new FormControl(null, [Validators.required]),
      adresse: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required]),
      taxe: new FormControl(null, [Validators.required]),

      //SourcePDF: new FormControl(null,),
      //createDate:new FormControl(null,[Validators.required]),
    });
  }
  initForm2(): void {
    this.form = new FormGroup({
      identifiant: new FormControl(this.data?.identifiant, [Validators.required]),
      NomPrenom: new FormControl(this.data?.NomPrenom, [Validators.required]),
      adresse: new FormControl(this.data?.adresse, [Validators.required]),
      email: new FormControl(this.data?.email, [Validators.required]),
      telephone: new FormControl(this.data?.telephone, [Validators.required]),
      taxe: new FormControl(this.data?.taxe, [Validators.required]),


      //SourcePDF: new FormControl(null,),

      //createDate:new FormControl(null,[Validators.required]),
    });
  }

  
  save() {
    if (!this.verifEdit) {
      this.dialogRef.close(this.form.value);
      this.LivreurService.save(this.form.value).subscribe(() => {
        this.router.navigateByUrl('/Livreurs').then(()=>{
          location.reload()
        })       });
    } else {
      this.dialogRef.close(this.form.value);
      this.LivreurService.edit(this.form.value, this.data?.id).subscribe(() => {
        this.router.navigateByUrl('/Livreurs').then(()=>{
          location.reload()
        })      });
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
