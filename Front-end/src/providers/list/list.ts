import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class ListProvider {
  data: any;
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(public http: Http) {
    
  }

  getList(){
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/list')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
          resolve(this.data);
        });
    });
 
  }
 
  createList(list){
 
    let header = new Headers;
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/list', JSON.stringify(list), {headers: header})
      .subscribe(res => {
        this.data = res.json();
        console.log(this.data);
      });
 
  }
 
  updateList(list,name){
    this.http.put('http://localhost:8080/list/'+list._id,{'name':name},this.options)
    .subscribe((res)=>{
      this.data = res.json();
      console.log(res.json());
    });
  }

  deleteItem(id){
    this.http.delete('http://localhost:8080/api/list/' + id).subscribe((res) => {
      console.log(res.json());
      this.data = res.json();
    });    
  }
  

}
