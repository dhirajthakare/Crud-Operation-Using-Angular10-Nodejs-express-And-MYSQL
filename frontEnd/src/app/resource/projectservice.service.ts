import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from './model';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  selectmodel:Model;
  storeData:Model[];
  readonly postDataUrl = "http://localhost:3000/insetData";
  readonly fetchDataUrl = "http://localhost:3000/Fetchdata";
  readonly DeleteDataUrl = "http://localhost:3000/deleteData";
  readonly UpdateDataUrl = "http://localhost:3000/edit";




  constructor( public http:HttpClient) { }

  postData(formData,image){

    formData.append('Name',this.selectmodel.Name);
    formData.append('Email',this.selectmodel.Email);
    formData.append('Mob',this.selectmodel.Mob);
    formData.append('file',image)
   
    return this.http.post(this.postDataUrl,formData);
  }


  GetData(){
    return this.http.get(this.fetchDataUrl);

  }
  DeleteData(Id){

    return this.http.delete(this.DeleteDataUrl+`/${Id}`);
  }

  Update(formData,image){
    formData.append('Name',this.selectmodel.Name);
    formData.append('Email',this.selectmodel.Email);
    formData.append('Mob',this.selectmodel.Mob);
    formData.append('file',image)
   
    return this.http.put(this.UpdateDataUrl+`/${this.selectmodel.Id}`,formData);
  }

  

}
