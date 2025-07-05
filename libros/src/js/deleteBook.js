(function(){
    const buttonsDelete = document.querySelectorAll('.delete-book')
     const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')


    buttonsDelete.forEach(buttonDelete=>(
        buttonDelete.addEventListener('click',alert)

    ))
    
    async function alert(e){
    const msg = 'You want to delete the book?'

    const confirmDelte = confirm(msg)

    if(confirmDelte){
        const {bookId:id}=e.target.dataset
        const url = `/books/book/delete/${id}`
        

        try {
            const response = await fetch(url,{
                method:'POST',
                headers:{
                    'CSRF-Token':token
                }
            })
            {
                response.ok ? window.location.href='/books':console.log('There was error when delete:',response.statusText);
                
            }
        } catch (error) {
            console.log(error);
            
        }
        

    }


    
}

})()

