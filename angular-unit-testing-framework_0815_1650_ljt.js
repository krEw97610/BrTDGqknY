// 代码生成时间: 2025-08-15 16:50:51
// Import the necessary Angular testing modules
import { TestBed } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MyComponent } from './my.component'; // Replace with your component

/**
 * A simple unit test class for the MyComponent
 */
class MyComponentTest {

  /**
   * A fixture for the MyComponent
   * @type {ComponentFixture}
   */
  private fixture: ComponentFixture<MyComponent>;

  /**
   * A reference to the MyComponent
   * @type {MyComponent}
   */
  private component: MyComponent;

  /**
   * A reference to the native element
   * @type {ElementRef}
   */
  private element: any;

  /**
   * Setup the testing environment
   */
  setUp() {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [MyComponent]
    });

    this.fixture = TestBed.createComponent(MyComponent);
    this.component = this.fixture.componentInstance;
    this.element = this.fixture.nativeElement;
  }

  /**
   * Test the component is created
   */
  testComponentCreation() {
    this.setUp();
    expect(this.component).toBeTruthy();
  }

  /**
   * Test the input binding
   */
  testInputBinding() {
    this.setUp();
    this.component.inputValue = 'Test Value';
    this.fixture.detectChanges();
    expect(this.element.querySelector('input').value).toEqual('Test Value');
  }

  /**
   * Test the output binding
   */
  testOutputBinding() {
    this.setUp();
    this.component.outputValue = 'Test Value';
    this.fixture.detectChanges();
    const outputSpy = spyOn(this.component.myEvent, 'emit');
    this.element.querySelector('button').click();
    expect(outputSpy).toHaveBeenCalledWith('Test Value');
  }

}

// Run the tests
const test = new MyComponentTest();
test.testComponentCreation();
test.testInputBinding();
test.testOutputBinding();