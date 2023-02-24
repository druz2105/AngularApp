import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';


  // characters: Object = {
  //   "Sardar Khan": 'Manoj Bajpayee',
  //   "Sultan": "Pankaj Tripathi",
  //   'Faizal Khan': "Nawaz",
  //   'Ramadhir': 'Tigmanshu Dhulia',
  //   'Perpendicular': null,
  //   'Definite': null,
  //   'Nagma': 'Richa Chaddha',
  //   'Durga': 'Rima Sen'
  // };

  list_characters = [
    {character: 'Sardar Khan', played_by: 'Manoj Bajpayee'},
    {character: 'Sultan', played_by: 'Pankaj Tripathi'},
    {character: 'Faizal Khan', played_by: 'Nawaz'},
    {character: 'Ramadhir', played_by: 'Tigmanshu Dhulia'},
    {character: 'Perpendicular', played_by: null},
    {character: 'Definite', played_by: null},
    {character: 'Nagma', played_by: 'Richa Chaddha'},
    {character: 'Durga', played_by: 'Rima Sen'}
  ]

}
