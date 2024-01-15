import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Item, ItemService } from '../services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  itemArray!: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.findAllByCategoryAndType("woman", "tshirt").subscribe(value => {
      if(value.body){
        this.itemArray = value.body;
      }
    })
  }

 
}
