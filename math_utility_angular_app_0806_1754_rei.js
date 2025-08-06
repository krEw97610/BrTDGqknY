// 代码生成时间: 2025-08-06 17:54:58
// MathUtilityAngularApp.js
// This file contains the Angular application for a math utility tool set.

// Import the required Angular core modules
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // For using form controls and directives

// Define the MathUtilityComponent which is responsible for the UI and logic of the math utilities
@Component({
    selector: 'app-math-utility',
    templateUrl: './math_utility_template.html',
    styleUrls: ['./math_utility_styles.css']
})
export class MathUtilityComponent {
    // Define the properties for input values
    numberOne: number;
    numberTwo: number;

    constructor() {
        this.numberOne = 0;
        this.numberTwo = 0;
    }

    // Function to add two numbers
    add() {
        return this.numberOne + this.numberTwo;
    }

    // Function to subtract the second number from the first
    subtract() {
        return this.numberOne - this.numberTwo;
    }

    // Function to multiply two numbers
    multiply() {
        return this.numberOne * this.numberTwo;
    }

    // Function to divide the first number by the second (with error handling)
    divide() {
        if (this.numberTwo === 0) {
            throw new Error('Cannot divide by zero');
        }
        return this.numberOne / this.numberTwo;
    }
}

// Define the AppModule which is the root module of the Angular application
@NgModule({
    declarations: [
        MathUtilityComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [MathUtilityComponent] // The component that will be bootstrapped
})
export class AppModule { }

// The main function to bootstrap the Angular application
export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

// Factory function to enable Angular to load the platform and bootstrap the AppModule outside of the browser
export function bootstrap() {
    document.addEventListener('DOMContentLoaded', main);
}
bootstrap();