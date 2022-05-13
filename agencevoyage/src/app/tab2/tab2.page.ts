import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  destForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private http: HttpClient
  ) {
    this.destForm = this.formBuilder.group({
      name: '',
      country: '',
      description: ''
    })
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
    const url = 'http://localhost:8080/destinations/add';
    const params = {};
    const headers = {"Content-Type": "application/json",'accept': 'application/json'};
    const data = JSON.stringify(this.destForm,this.getCircularReplacer())

    if (!this.destForm.valid) {
      return false;
    } else {
      this.http.post(url,{
        params,
        headers, 
        data
      })
        .subscribe((response) => {
          this.zone.run(() => {
            this.destForm.reset();
            this.router.navigate(['/tabs/tab1']);
            
            
          })
        });
    }
  }
  doRefresh() {
    window.location.reload();
  }

}
