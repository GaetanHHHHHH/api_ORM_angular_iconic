import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ModalPage } from '../modal/modal.page'; 
import { ModalController} from '@ionic/angular';  


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  Destination: any={}
  Agencies: any=[]
  destId: number= -1
  agencyId: string

  // isEditting: boolean = false


  constructor(private router: Router,
    private http: HttpClient,
    private activatedRoute:ActivatedRoute,
    public modalCtrl: ModalController) {
    
    this.activatedRoute.paramMap.subscribe(
      (data) => {
        console.log(data)
      }
    );


    this.destId = +this.activatedRoute.snapshot.paramMap.get('destId');
    this.getData()


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

  getData(): Promise<void> {
    const url1 = `http://localhost:3000/destinations/id=${this.destId}`;
    const url2 = `http://localhost:3000/agencies/search/id=${this.destId}`;
    const params = {};
    const headers = {};
    
    return new Promise((resolve, reject)=>{
      this.http.get(url1,{params,headers}).subscribe((response) => {
        this.Destination = response
      });
      this.http.get(url2,{params,headers}).subscribe((response) => {
        this.Agencies = response
      });
    })
  }

  deleteDestination(destId){
    const url = `http://localhost:3000/destinations/id=${this.destId}`

    this.http.delete(url).subscribe((response) => {
      this.router.navigate(['/tabs/tab1'])
    })
  }

  deleteLink(linkId){
    const url = `http://localhost:3000/links/id=${linkId}`
    this.http.delete(url).subscribe((response) => {this.doRefresh()})
  }


  linkAgency(): Promise<void>{
    const url = `http://localhost:3000/links/add`
    const newLink = {
      destination_id: this.destId,
      agency_id: parseInt(this.agencyId)
    }
    const data = JSON.stringify(newLink,this.getCircularReplacer())
    const headers = {"Content-Type": "application/json",'accept': 'application/json'};

    return new Promise((resolve, reject)=>{
      this.http.post(url,{
        headers, 
        data})
        .subscribe((response) => {
        this.agencyId = ''
        this.doRefresh()
      });})
  }

  async editDestination(){
    // this.isEditting = !this.isEditting
    const modal = await this.modalCtrl.create({  
      component: ModalPage,
      componentProps: {
        Destination: this.Destination
     }
    });  
    return await modal.present();  
  }
  doRefresh() {
    window.location.reload();
  }


}
