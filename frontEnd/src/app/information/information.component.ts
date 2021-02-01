import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Model } from '../resource/model';
import { ProjectserviceService } from '../resource/projectservice.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(
     public service:ProjectserviceService,
     public router : Router
     ) { }

  ngOnInit(): void {
    this.FetchData();
  }


    FetchData(){
      this.service.GetData().subscribe((res)=>{
        this.service.storeData = res as Model[];
      })
    }

    delete(item){
      if(confirm("Are You Sure You Want To Delete Data ? ")){
        this.service.DeleteData(item.Id).subscribe((res)=>{
          console.log(res); 
          this.FetchData();
        })
      }
    }

    Edit(item){

this.router.navigate(['registration'],{
  queryParams:{
    token:btoa(JSON.stringify(item))
  }
})

    }
}
