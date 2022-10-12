import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    username: '',
    password: '',
  }
  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open(
        "El nombre de usuario es requerido!",
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        }
      );
    } else {
      this.userService.registrarUsuario(this.user).subscribe(
        (data) => { 
          console.log("data in subscriber: " + data);
          Swal.fire('Usuario Guardado', 'Usuario ' + this.user.username + ' registrado con exito en el sistema', 'success');
          this.router.navigate(['login']);
        },
        (error) => {
          this.snack.open(
            "Ha ocurrido un error en el sistema, intente de nuevo",
            'Aceptar',
            {
              duration: 3000
            }
          );
        }
      );
    }



  }

}
