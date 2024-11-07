import {Component, OnInit, signal} from '@angular/core';
import {Character, CharacterService} from "../character.service";

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.css'
})
export class RandomizerComponent implements OnInit{
  character : Character | undefined;

  size = signal<number>(0.5);

  characterUrl = signal<string>("")

  constructor(private characterService : CharacterService) {
  }
  async ngOnInit() {
    await this.generateNewCharacter();
  }

  shrink(){
    if(this.size() > 0.19) {
      this.size.update(si => si - 0.1)
    }
  }

  grow(){
    if (this.size() < 1.91) {
      this.size.update(si => si + 0.1)
    }
  }

  async generateNewCharacter(){
    this.character = await this.characterService.getRandomCharacter();

    if(this.character){
      this.characterUrl.set((await this.characterService.getImageUrl(this.character)).url)
    }
  }
}
