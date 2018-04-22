import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  rForm: FormGroup;
  rForm1: FormGroup;
  post:any; 
  post1: any;                    // A property for our submitted form
  description:string = '';
  name:string = '';
  name1:string = '';
  titleAlert:string = 'This field is required';

  constructor(private fb: FormBuilder) {

    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'validate' : ''
    });
    this.rForm1 = fb.group({
      'name1': [null, Validators.required],
      'validate' : ' '
    });

  }

  ngOnInit() {

    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.rForm.get('name').setValidators(Validators.required);
        }
        this.rForm.get('name').updateValueAndValidity();
      }
    );
    this.rForm1.get('validate').valueChanges.subscribe(
      (validate) => {
        this.rForm1.get('name1').setValidators(Validators.required);
      }
    )
  }

  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }
  addPost1(post1) {
    this.name1 = post1.name1;
  }

}
