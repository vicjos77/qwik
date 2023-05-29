import { Slot, component$} from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';



export const useServerTimeLoader = routeLoader$(() => {
    return {
      date: new Date().toISOString(),
    };
  });

export default component$(() => {
  
    return (
    
      <>
      <h1>prueba</h1>
      <Slot/>
      </>
   
    )
});