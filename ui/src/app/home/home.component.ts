import {Component, inject, signal, OnInit} from '@angular/core';
import {Character, CharacterService, Eye, Mouth, RightHand} from "../character.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  characterService = inject(CharacterService);

  eye = signal<Eye>("NoEye");

  hasHammer = signal<boolean>(false);

  mouth = signal<Mouth>("NoMouth");

  rightHand = signal<RightHand>("NoHand");

  hasTail = signal<boolean>(false);

  imageUrl = signal<string>("")

  async ngOnInit() {
    await this.submitData();
  }

  async fillWithRandomData() {
    const randomChar = await this.characterService.getRandomCharacter();
    this.eye.set(randomChar.eye);
    this.hasHammer.set(randomChar.hasHammer);
    this.mouth.set(randomChar.mouth);
    this.rightHand.set(randomChar.rightHand);
    this.hasTail.set(randomChar.hasTail);

    await this.submitData();
  }

  async submitData(){
    const character: Character = {
      eye: this.eye(),
      hasHammer: this.hasHammer(),
      mouth: this.mouth(),
      rightHand: this.rightHand(),
      hasTail: this.hasTail()
    }

    this.imageUrl.set((await this.characterService.getImageUrl(character)).url);
  }
}
