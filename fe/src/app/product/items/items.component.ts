import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Item, ItemService, Size } from 'src/app/services/item.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Item>;
  itemArray!: Item[];
  type!: string;
  category!: string;
  urlParams!: Observable<string>;

  constructor(private itemService: ItemService, 
              private changeDetectorRef: ChangeDetectorRef, 
              private route: ActivatedRoute) {}
   

  ngOnInit(): void {

    this.route.params.subscribe(queryParams => {
      this.type = queryParams['type'];
      this.category = queryParams['category'];

      this.itemService.findAllByCategoryAndType(this.category, this.type).subscribe(value => {
        if(value.body){
          this.itemArray = value.body;
          this.dataSource = new MatTableDataSource<Item>(value.body);
          this.obs = this.dataSource.connect();
          this.dataSource.paginator = this.paginator;
          this.changeDetectorRef.detectChanges();
        }
      })

    });
    

  }

  doFilter(event: any) {
       this.dataSource.filter =  event.target.value.trim().toLowerCase(); 
       this.dataSource.filterPredicate = function (data, filter: string): boolean {
         return data.name.toLowerCase().includes(filter) || data.description.toLowerCase().includes(filter) 
         || data.country.toLowerCase().includes(filter)
       }
  }

  onFilter(data: any) {
    let filteredArray: Item[] = this.itemArray;
    
    if(data.price !== undefined && data.price !== 0){
      filteredArray = filteredArray.filter(item => 0 < item.price && item.price < data.price);
    }
    if(data.stars !== 0 && data.stars.length !== 0){
      let a = data.stars[0] - 1;
      let b = data.stars[data.stars.length - 1]; 
      filteredArray = filteredArray.filter(item => a <= item.stars && item.stars <= b);
    }
    if(data.size !== 0 &&  data.size.length !== 0){
      let newArray: Item[] = [];
      filteredArray.forEach(item => {
        data.size.forEach((s: string) => {
          item.amount.forEach(a => {
            if(s === a.name && a.amount > 0) newArray.push(item); 
          });
        });
      });
      console.log(newArray);
      filteredArray = newArray;
    }
    if(data.country !== 0 && data.country.length !== 0){
      let c: Item[] = [];
      data.country.forEach((element: string) => {
        filteredArray.filter(item => item.country == element).forEach(item => c.push(item));
      });
      filteredArray = c;
    }
    this.dataSource.data = filteredArray;
  }

  filterSizeItem(item: Item){
    
  }
  
}

