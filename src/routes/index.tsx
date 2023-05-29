import { $, component$} from '@builder.io/qwik';
import { type DocumentHead} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigate } from '@builder.io/qwik-city';
import { usePokemonGame } from '~/hooks/usePokemonGame';
  


export default component$(() => {
  const nav = useNavigate();
  const {isPokemonVisible,
         showBackImage, 
         nextPokemon,
         prevPokemon, 
         pokemonId,
         toogleVisible,
         toogleFromBack
         }=usePokemonGame()

const gotoPokemon= $(async()=>{
  await nav(`/pokemons/${pokemonId.value}/`)
})


    
  return (
    <>
    <span class="text-5xl">hola mundo</span>
    <span class="text-9xl">{pokemonId.value}</span>

    
    <div onClick$={()=>gotoPokemon()}>

      <PokemonImage 
        id={(pokemonId.value)} 
        size={200} 
        backImage={showBackImage.value} 
        showImage={isPokemonVisible.value}/>
    </div>

    
   
      
    <div class="mt-2">
      <button onClick$={prevPokemon} class="btn btn-primary mr-2">Anterior</button>
      <button onClick$={nextPokemon} class="btn btn-primary mr-2">Siguiente</button>
      <button onClick$={ toogleFromBack} class="btn btn-primary mr-2 ">voltear</button>
      <button onClick$={toogleVisible} class="btn btn-primary ">Revelar</button>
  </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Primera aplicacion de Qwik',
    },
  ],
};
