import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  Destinations: any=[]
  // isExpanded: boolean = false;

  constructor(private router:Router, private http: HttpClient) {


    this.getData()
  }
  getData(): Promise<void> {
    const url = 'http://localhost:3000/destinations';
    const params = {};
    const headers = {};
    
    return new Promise((resolve, reject)=>{
      this.http.get(url,{params,headers}).subscribe((response) => {
        this.Destinations = response
        // this.Destinations.isExpanded = false
        this.Destinations.forEach(function(obj){
          obj.isExpanded = false;
          });
        console.log(this.Destinations)
      });
    })
  }
  editDestination(destId){
    this.router.navigate(['/tabs/tab3',destId])
  }
  deleteDestination(destId){
    const url = `http://localhost:3000/destinations/id=${destId}`

    this.http.delete(url).subscribe((response) => {
      this.router.navigate(['/tabs/tab1'])
      this.doRefresh()
    })
  }
  expandDestination(destId){
    var index = this.Destinations.findIndex(({id})=> id === destId)
    this.Destinations[index].isExpanded = !this.Destinations[index].isExpanded
  }

  doRefresh() {
    window.location.reload();
  }

}
