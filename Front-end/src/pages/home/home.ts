import { ListProvider } from '../../providers/list/list';
import { FormControl, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listForm:any;
  isUpdate:boolean =false;
  constructor(
    public navCtrl: NavController, 
    private listProvider:ListProvider
    ) {
      this.listForm = new FormGroup({
      name: new FormControl()
    });
  }

  ionViewDidLoad() {
    this.listProvider.getList();
    this.listProvider.data;
    console.log(this.listProvider.data);
  }

  save(){
    this.listProvider.createList(this.listForm.value);
    this.listForm.reset();
  }

  updateList(list,name){
    this.listProvider.updateList(list,name.value);
  }

  removeList(id){
    this.listProvider.deleteItem(id);
  }
}
