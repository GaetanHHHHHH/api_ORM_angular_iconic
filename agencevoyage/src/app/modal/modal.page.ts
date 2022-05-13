import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  destForm: FormGroup;
  Destination: any;

  constructor(
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public navParams: NavParams) {
      
      this.Destination =  this.navParams.get('Destination')
      this.destForm = this.formBuilder.group({
        id: this.Destination.id,
        name: this.Destination.name,
        country: this.Destination.country,
        description: this.Destination.description
      })
    }  


  ngOnInit() {
  }
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  onSubmit() {
    const url = `http://localhost:8080/destinations/id=${this.Destination.id}`;
    const params = {};
    const headers = {"Content-Type": "application/json",'accept': 'application/json'};
    const data = JSON.stringify(this.destForm,this.getCircularReplacer())

    if (!this.destForm.valid) {
      return false;
    } else {
      this.http.put(url,{
        params,
        headers, 
        data
      })
        .subscribe((response) => { 
          this.dismiss()
          this.doRefresh()
        });
    }
  }

  doRefresh() {
    window.location.reload();
  }

}
