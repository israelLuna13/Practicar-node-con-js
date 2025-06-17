(function(){
//bg-lime-500 text-black uppercase text-xs text-center p-2 mb-1 font-bold
const alertSucces = document.querySelector('.alert-success')
const alertError = document.querySelectorAll('.alert-error')

if(alertSucces){
    alertSucces.classList.add(
        'bg-lime-500',
        'text-black',
        'font-bold',
        'uppercase',
        'text-lg',
        'text-center',
        'p-3',
        'mb-1',
        'rounded'
    )
    setTimeout(()=>{
        alertSucces.remove()
    },3000)
}

alertError.forEach(el =>{
    el.classList.add(
        'bg-red-600',
        'text-wihte',
        'font-bold',
        'uppercase',
        'text-lg',
        'text-center',
        'p-3',
        'mb-1',
        'rounded'
    )
})

})()