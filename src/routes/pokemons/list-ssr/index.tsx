import { component$, useComputed$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon} from '~/interfaces';

export const usePokemonList= routeLoader$<SmallPokemon[]>(async({query, redirect, pathname})=>{
    const offset=Number(query.get('offset') || '0');
    if (isNaN(offset)) redirect(301,pathname);
    if (offset< 0) redirect(301,pathname);

    const pokemons=await getSmallPokemons(offset);
return  pokemons
})

export default component$<number>(() => {
    const modalVisible=useSignal(false);
    const pokemons=usePokemonList();
    const location = useLocation()

    const currentOffset=useComputed$(()=>{

        
        const offsetString=new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset')|| 0);
    })
    

    return( 
    <>
    <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span >Offset: {currentOffset}</span>
        <span >Is navigating: {location.isNavigating ? 'Si':'No'}</span>
    </div>

    <div class="mt-10">
        <Link 
        href={`/pokemons/list-ssr/?offset=${ currentOffset.value-10}`}
        class="btn btn-primary mr-2">
            Anteriores
        </Link>
    </div>
    <div class="mt-10">
        <Link 
        href={`/pokemons/list-ssr/?offset=${ currentOffset.value+10}`}
        class="btn btn-primary mr-2">
            Siguientes
        </Link>
    </div>
    <div class="grid grid-cols-6 mt-5">
        {pokemons.value.map(({name,id})=>(
            <div key={ name } class="m-5  flex flex-col justify-center items-center">
            <PokemonImage id={id}/>
            <span class="capitalize">{name}</span></div>

))}
        
        
    </div>
 <Modal showModal={modalVisible.value}>
    <div q:slot='title'>Nombre del Pokemon</div>
    <div class="flex flex-col justify-center items-center" q:slot='content'>
        <PokemonImage id='1'/>
        <span>Preguntandole a chat gpt</span>
    </div>

 </Modal>
   

    </>
)});



export const head: DocumentHead = {
    title: 'List- Ssr',
  };