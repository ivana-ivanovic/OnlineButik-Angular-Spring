import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl,  FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/services/item.service';
import { User, UserService } from 'src/app/services/user.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'size', 'amount'];
  formGroup!: FormGroup;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  user: User;
  forPayment!: number;
  cart!: CartItem[];
  dataSource: MatTableDataSource< {item: Item, size: string, amount: number }>
  items:  {item: Item, size: string, amount: number }[]

  
  constructor(private _formBuilder: FormBuilder,  
              private userService: UserService,  
              private cartService: CartService, 
              private orderService: OrderService,
              private router: Router, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<OrderComponent>) {
    this.user = userService.currentUser;
    if(this.cartService.cart)this.forPayment = this.cartService.cart?.totalPrice;
    if(this.cartService.cart)this.cart = this.cartService.cart?.items;
    this.items = this.cartService.items
    this.dataSource = new MatTableDataSource< {item: Item, size: string, amount: number }>(this.items);
  }


  ngOnInit(): void {
    console.log(this.data);

   
    
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstCtrl: ['', Validators.required],
          secondCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          thirdCtrl: ['', Validators.required],
          fourthCtrl: ['', Validators.required],
        }),
      ])
    });
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
  }

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  makeOrder(){
    console.log("this.formGroup.value.formArray[0].firstCtrl");
    this.orderService.makeOrder(this.forPayment, this.formGroup.value.formArray[1].thirdCtrl, this.formGroup.value.formArray[1].fourthCtrl);
    alert("Hvala sto ste narucili");
    this.dialogRef.close();
  }
  

}
