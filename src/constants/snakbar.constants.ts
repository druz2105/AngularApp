import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SnakBarConstants {
  constructor(private snackBar: MatSnackBar) {
  }

  snackBarSuccess() {
    this.snackBar.open('Success: ' + "Success", 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['success-snackbar']
    });
  }

  snackBarError(error: any) {
    return this.snackBar.open('Error' + error.status + ': ' + error.message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['error-snackbar']
    });
  }

}
