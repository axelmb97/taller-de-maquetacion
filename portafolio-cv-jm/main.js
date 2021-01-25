// Menu
((d) =>{
    const $btnMenu = d.querySelector('.menu-btn'),
        $menu = d.querySelector('.menu')
    
    $btnMenu.addEventListener('click', e => {
        $btnMenu.firstElementChild.classList.toggle('none')
        $btnMenu.lastElementChild.classList.toggle('none')
        $menu.classList.toggle('is-active')
    })
    d.addEventListener('click', e => {
        if(e.target.matches('.menu a')){
            $btnMenu.firstElementChild.classList.remove('none')
            $btnMenu.lastElementChild.classList.add('none')
            $menu.classList.remove('is-active')
        }
    })
})(document);

// Contac Form

((d) =>{
const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response');

$form.addEventListener('submit', e => {
    e.preventDefault()
    $loader.classList.remove('none')
    fetch("https://formsubmit.co/ajax/440451223e46ac4d451ea2b4714c0172",{
        method:"POST",
        body:new FormData(e.target)
    })
    .then(res => {return res.ok ? res.json() : Promise.reject(res)})
    .then(data =>{
        console.log(data)
        // Modificaciones la url y le agregamos #gracias. Ese es el id de la ventana modal
        location.hash = "#gracias"
        $form.reset()
    })
    .catch(err => {
        console.log(err)
        // Hay respuestas en las que no viene el status text. En caso de que no venga, creamos nuestro propio mensaje personalizado
        let message = err.statusText || "Ocurrio un error al enviar el formulario. Intenta nuevamebnte"
        $response.querySelector('h3').innerHTML = `Error ${err.status}: ${message}`
    })
    .finally(() => {
        $loader.classList.add('none')
        // Cerramos la ventana modal automaticamente
        setTimeout( () =>{
            location.hash = "#close"
        },3000)
    })
})
})(document);