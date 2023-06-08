import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
declare var Razorpay: any;

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();
  constructor(orderService: OrderService,
    private cartService: CartService,
    private router:Router,
    private toastrService: ToastrService,private orderS:OrderService) {
      orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
        },
        error:() => {
          router.navigateByUrl('/chekcout');
        }
      })

   }

  ngOnInit(): void {
  }
  payNow(): void {
    const razorpayOptions = {
      key: 'rzp_test_991z2ZamM9gkkz',
      amount: this.order.totalPrice * 100, // Amount should be in paise
      currency: 'INR',
      name: 'The Big Meal',
      description: 'Sample Razorpay demo',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: this.order.name,
        address:this.order.address
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      },
      handler: (response: any) => {
        this.handlePaymentResponse(response);
      }
    };

    const razorpayInstance = new Razorpay(razorpayOptions);
    razorpayInstance.open();
  }

  handlePaymentResponse(response: any): void {
    // Handle payment response here
    this.order.paymentId=response.razorpay_payment_id;
    this.orderS.pay(this.order).subscribe(
      {
        next: (orderId) => {
          this.cartService.clearCart();
          this.router.navigateByUrl('/track/' + orderId);
          this.toastrService.success(
            'Payment Saved Successfully',
            'Success'
          );
        },
        error: (error) => {
          this.toastrService.error('Payment Save Failed', 'Error');
        }
      }
    );
    // console.log(response);
    // this.cartService.clearCart();
    // this.router.navigateByUrl('/track/' + response.razorpay_payment_id);
    // this.toastrService.success(
    //   'Payment Saved Successfully',
    //   'Success'
    // );
  }
}
