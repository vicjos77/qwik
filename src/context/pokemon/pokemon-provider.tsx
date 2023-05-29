import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { PokemonGameContext, type PokemonGameState } from './pokemon-game.context';
import { PokemonListContext, type PokemonListState } from './pokemon-list.context';

export const PokemonProvider = component$(() => {
 
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId: 1,
        isPokemonVisible: true,
        showBackImage: false,
      })
      const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
      })
    
      useContextProvider(PokemonGameContext, pokemonGame);
      useContextProvider(PokemonListContext, pokemonList);

      useVisibleTask$(()=>{
        if(localStorage.getItem('pokemon-game')){
          const data=JSON.parse(localStorage.getItem('pokemon-game')!);
          
        }
      })
 
      useVisibleTask$(({track})=>{
       track(()=>[pokemonGame.isPokemonVisible, pokemonGame.pokemonId,  pokemonGame.showBackImage])
       localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
      })
     // 
 
    return (<Slot/>)
});

