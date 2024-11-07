import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RandomizerComponent} from "./randomizer/randomizer.component";

export const routes: Routes = [
  {path: "", redirectTo:"home", pathMatch: "full"},
  {path: "home", component: HomeComponent},
  {path: "randomizer", component: RandomizerComponent}
];
