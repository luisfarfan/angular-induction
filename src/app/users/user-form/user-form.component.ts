import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  id: number;
  user: IUser;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.createForm();
    if (this.id) {
      this.getUser();
    }
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      userId: [null, Validators.required],
      title: [null, Validators.required],
      completed: [null]
    });
  }

  getUser(): void {
    this.userService.getUser(this.id).subscribe(user => {
      this.user = user;
      this.setForm();
    });
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const data = this.userForm.getRawValue();
      // editar!
      if (this.id) {
        this.userService.editUser(this.id, data).subscribe(response => {
          alert('Usuario editado con éxito!');
          this.comeBack();
        });
      } else {
        this.userService.addUser(data).subscribe(response => {
          alert('Usuario agregado con éxito!');
          this.comeBack();
        });
      }
    } else {
      alert('FORMUARLIO INVALIDO!');
    }
  }

  setForm(): void {
    this.userForm.get('userId').setValue(this.user.userId);
    this.userForm.get('title').setValue(this.user.title);
    this.userForm.get('completed').setValue(this.user.completed);
  }

  comeBack(): void {
    this.router.navigate(['list']);
  }

}
