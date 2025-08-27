// 代码生成时间: 2025-08-28 06:34:12
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentService } from './payment.service'; // Import PaymentService for payment logic
import { MatSnackBar } from '@angular/material/snack-bar'; // MatSnackBar for displaying messages

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {
  // Payment form group
  paymentForm: FormGroup;

  // Error message to display
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialize the payment form
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^\d{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^\d{2}/\d{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^\d{3,4}$')]],
      amount: ['', [Validators.required, Validators.pattern('^\d*\.?\d{0,2}$')]]
    });
  }

  // Submit the payment form
  onSubmit(): void {
    if (this.paymentForm.valid) {
      // Process payment
      this.paymentService.processPayment(this.paymentForm.value).subscribe({
        next: (paymentResponse) => {
          // Handle successful payment
          this.snackBar.open('Payment successful!', 'OK', {
            duration: 3000
          });
        },
        error: (error) => {
          // Handle payment error
          this.errorMessage = error.message;
          this.snackBar.open('Payment failed: ' + error.message, 'OK', {
            duration: 3000
          });
        }
      });
    } else {
      // Handle form validation errors
      this.errorMessage = 'Please fill in all fields correctly.';
      this.snackBar.open(this.errorMessage, 'OK', {
        duration: 3000
      });
    }
  }
}

/*
 * PaymentService - Angular service for payment processing.
 *
 * This service handles the logic for processing payments.
 * It abstracts away the payment processing details.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentApiUrl = 'api/payment/process';

  constructor(private httpClient: HttpClient) {}

  processPayment(paymentDetails: any): Observable<any> {
    return this.httpClient.post(this.paymentApiUrl, paymentDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Handle error
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
