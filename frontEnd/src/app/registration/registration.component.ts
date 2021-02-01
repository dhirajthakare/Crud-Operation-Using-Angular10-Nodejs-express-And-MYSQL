import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../resource/model';
import { ProjectserviceService } from '../resource/projectservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  displaySubmit = "block";
  displayUpdate = "none";
  image;
      // Id;
      // Name;
      // Email;
      // Mob;
      // ImageUrl;
  constructor(
     public service:ProjectserviceService,
      public http:HttpClient,
      public router:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.resetdata();
    this.routerinput();
  }
  onsubmit(form:NgForm){  
    const formData = new FormData();

    // console.log(form.value.file);
    this.service.postData(formData,this.image).subscribe((Response)=>{
    this.resetdata();
    
      
    })

   
  }
  update(){

    const formData = new FormData();

    // console.log(form.value.file);
    this.service.Update(formData,this.image).subscribe((res)=>{
      console.log(res);
      this.resetdata();
      this.displaySubmit="block";
      this.displayUpdate="none";
      this.Editdata="";
    })

  }
  selectImage(event){

    if(event.target.files.length>0){
    this.image=event.target.files[0];
    }
  }

  resetdata(form?:NgForm){
    if(form)
    form.reset();
    this.service.selectmodel = {
      Id:null,
      Name:"",
      Email:"",
      Mob:"",
      ImageUrl:""


    }
  }
  Editdata:any;
  routerinput(){

    this.router.queryParams.subscribe((res)=>{
      this.Editdata=JSON.parse(atob(res.token))
      console.log(res.token);
      if(this.Editdata.Id!==""){
        this.Edit(this.Editdata);
      }
    })
  }

  Edit(data:Model){

    this.service.selectmodel=data;

  }

}
