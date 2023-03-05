export default class HandGestureView {
    //Aula 02 - Reconhecer gestos de mãos individuais e printar no log
    #swal
    constructor({ swal }) {
        this.#swal = swal
    }

    loop(fn) {
        requestAnimationFrame(fn)
    }
    
    scrollPage(top) {
        scroll({
            top,
            behavior: 'smooth'
        })
    }

    // Aula 02 - Reconhecer gestos de mãos individuais e printar no log
    buildSwal(gesture) {
        this.#swal.fire({
            icon: `success`,
            title: `<span>Gesto detectado ${gesture}</span>`,
            showConfirmButton: false,
            background: '#2C3033',
            timer: 1100
        })    
    }
}