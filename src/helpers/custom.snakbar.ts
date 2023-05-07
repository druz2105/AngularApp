import {MatSnackBar} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CustomSnakbar {
  constructor(private snackBar: MatSnackBar) {
  }

  snackBarSuccess(message: string) {
    this.snackBar.open('Success: ' + message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['success-snackbar']
    });
  }

  snackBarError(error: any) {
    if (error.message) {
      return this.snackBar.open('Error' + error.status + ': ' + error.error.message, 'Close', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: ['error-snackbar']
      });
    }
    return this.snackBar.open('Error' + error.status + ': ' + "Error in processing request.", 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['error-snackbar']
    });
  }

}
