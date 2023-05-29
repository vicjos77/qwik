import { $, component$, useComputed$, useSignal, useStore } from '@builder.io/qwik';
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
    const modalPokemon = useStore({
      id: '',
      name:'',
    });
    const pokemons=usePokemonList();
    const location = useLocation()

    const showModal=$((id: string, name: string)=>{
        modalPokemon.id=id;
        modalPokemon.name=name;
        modalVisible.value=true
  
    })
    const closeModal=$(()=>{
        modalVisible.value=false
    })


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
        {pokemons.value.map(({id,name})=>(
            <div key={ name } 
                 onClick$={()=>showModal(id,name)}
                 class="m-5  flex flex-col justify-center items-center">
            <PokemonImage id={id}/>
            <span class="capitalize">{name}</span></div>

))}
        
        
    </div>
 <Modal 
    persistent 
    size='md'
    showModal={modalVisible.value} 
    closeFn={closeModal}
    >
    <div q:slot='title'>{modalPokemon.name}</div>
    <div class="flex flex-col justify-center items-center" q:slot='content'>
        <PokemonImage id={modalPokemon.id}/>
        <span>Preguntandole a chat gpt</span>
    </div>

 </Modal>
   

    </>
)});



export const head: DocumentHead = {
    title: 'List- Ssr',
  };