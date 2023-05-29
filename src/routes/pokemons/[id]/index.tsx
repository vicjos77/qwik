import { component$, useContext } from '@builder.io/qwik';
import {  routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';
import { usePokemonGame } from '~/hooks/usePokemonGame';


export const usePokemonId=routeLoader$<number>(({params, redirect})=>{

   
const id=Number(params.id);
if (isNaN(id)) redirect(301, '/');  
if (id <= 0) redirect(301, '/');
if (id >= 1000) redirect(301, '/');
    return id;
}
)



export default component$(() => {
const {toogleVisible, toogleFromBack}=usePokemonGame()
const pokemonGame=useContext(PokemonGameContext)
    //*const location=useLocation()
const pokemonId=usePokemonId()
  

    return(
    <>
    <span>Pokemon: {pokemonId}</span>
    <PokemonImage id={pokemonId.value} showImage={pokemonGame.isPokemonVisible}  backImage={pokemonGame.showBackImage} />
    <div class="mt-2">
      <button onClick$={ toogleFromBack} class="btn btn-primary mr-2 ">voltear</button>
      <button onClick$={ toogleVisible } class="btn btn-primary ">Revelar</button>
  </div>

    </>
    )
});