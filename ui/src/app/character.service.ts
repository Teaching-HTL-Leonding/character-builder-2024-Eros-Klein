import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

export type Character = {
  eye: Eye;
  hasHammer: boolean;
  mouth: Mouth
  rightHand: RightHand
  hasTail: boolean
}

export type Eye = 'NoEye' | 'HalfOpen' | 'Closed' | 'Open';

export type Mouth = 'NoMouth' | 'Happy' | 'Normal' | 'Unhappy';

export type RightHand = 'NoHand' | 'Normal' | 'Victory';

type imageUrlResponse = {
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  readonly URI = 'http://localhost:5110/'
  constructor(private httpClient : HttpClient) {}

  async getImageUrl(character: Character){
    return await firstValueFrom<imageUrlResponse>(this.httpClient.post<imageUrlResponse>(this.URI + "build-image-url", JSON.stringify(character), {
      headers: {
        "Content-Type": "application/json"
      }
    }));
  }

  async getRandomCharacter(){
    return await firstValueFrom<Character>(this.httpClient.get<Character>(this.URI + "get-random-image-options"));
  }

  getAllPossibleTypes(){
    const possibleTypes : {eye: Eye[], mouth: Mouth[], rightHand: RightHand[]} = {
      eye: ["NoEye", "Open", "HalfOpen", "Closed"],
      mouth: ["NoMouth", "Normal", "Happy", "Unhappy"],
      rightHand: ["NoHand", "Normal", "Victory"]
    }

    return possibleTypes;
  }

}
