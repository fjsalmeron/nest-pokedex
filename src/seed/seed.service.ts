import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) {}

  async executeSEED(){

    this.pokemonModel.deleteMany({}); // Delete * from pokemons

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach( ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[ segments.length -2 ];

      if ( !pokemonToInsert.find(pokemon => pokemon.name === name) )
        pokemonToInsert.push({ name, no });
          
    });

    this.pokemonModel.insertMany( pokemonToInsert );

    return 'Seed executed';
  
  }

}
