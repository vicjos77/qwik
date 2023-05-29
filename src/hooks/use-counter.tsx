import {$, useSignal } from "@builder.io/qwik";

export const useCounter=(initialValue : number)=>{

    //const counter=useCounter(15)
    const counter=useSignal(initialValue)

    const increaseCounter= $(()=>{
            counter.value++;
    })

    const decreaseCounter= $(()=>{
        counter.value--;
})

    return {
        counter: counter,
        increase:increaseCounter,
        decrease:decreaseCounter,

    }
}