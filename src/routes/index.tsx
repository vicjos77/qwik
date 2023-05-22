import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead} from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { useNavigate } from '@builder.io/qwik-city';
  


export default component$(() => {
  const nav = useNavigate();
  const pokemonId = useSignal(1);
  const showbackImage=useSignal(false);
  const showImage=useSignal(false);

const gotoPokemon= $(async()=>{
  await nav(`/pokemons/${pokemonId.value}/`)
})

  const changePokemonId = $((value: number)=>{
    if ((pokemonId.value + value)<=0) return;
    pokemonId.value+=value;
  })

    const changeVoltear = $((value: boolean)=>{
      showbackImage.value= !value
      
    })
    
  return (
    <>
    <span class="text-5xl">hola mundo</span>
    <span class="text-9xl">{pokemonId}</span>

    
    <div onClick$={()=>gotoPokemon()}>

      <PokemonImage 
        id={(pokemonId.value)} 
        size={200} 
        backImage={showbackImage.value} 
        showImage={showImage.value}/>
    </div>

    
   
      
    <div class="mt-2">
      <button onClick$={()=>changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
      <button onClick$={()=>changePokemonId(+1)} class="btn btn-primary mr-2">Siguiente</button>
      <button onClick$={()=>changeVoltear(showbackImage.value)} class="btn btn-primary mr-2 ">voltear</button>
      <button onClick$={()=>showImage.value=!showImage.value} class="btn btn-primary ">Revelar</button>
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
