import { prepareRunChecker } from "../../../../lib/shared/util.js"

const { shouldRun: scrollShouldRun } = prepareRunChecker({ timerDelay: 200 })
const { shouldRun: swalShouldRun } = prepareRunChecker({ timerDelay: 1000 })
const { shouldRun: clickShouldRun } = prepareRunChecker({ timerDelay: 700 })
export default class HandGestureController {
    #view
    #service
    #camera
    #lastDirection = {
        direction: '',
        y: 0
    }

    constructor({ view, service, camera }) {
      this.#view = view
      this.#service = service
      this.#camera = camera
    }

    async init() {
        return this.#loop()
    }

    #scrollPage(direction) {
        const pixelPerScroll = 100
        if(this.#lastDirection.direction === direction) {
            //this.#lastDirection.y = (
                // direction === 'scroll-down' ?
                // this.#lastDirection.y + pixelPerScroll :
                // this.#lastDirection.y - pixelPerScroll
                
                //Aula 02 - Reconhecer gestos de mãos individuais e printar no log
                if(direction === 'scroll-down') {
                    this.#lastDirection.y = this.#lastDirection.y + pixelPerScroll
                } else if (direction === 'scroll-up') {
                    this.#lastDirection.y = this.#lastDirection.y - pixelPerScroll
                } else {
                    //console.log('nada')
                }
            //)
        } else {
            this.#lastDirection.direction = direction
        }
        this.#view.scrollPage(this.#lastDirection.y)
    }

    #buildSwal(gesture) {
        this.#view.buildSwal(gesture)
    }

    async #estimateHands() {
        try {
            const hands = await this.#service.estimateHands(this.#camera.video)
            this.#view.clearCanvas()
            if(hands?.length)
                this.#view.drawResults(hands)
            for await (const { event, x, y, othersGesturesIcon } of this.#service.detectGestures(hands)) {
                //console.log({ event, x, y })
                if(event.includes('scroll')) {
                    if(!scrollShouldRun()) continue;
                    this.#scrollPage(event)
                }
                //Aula 02 - Reconhecer gestos de mãos individuais e printar no log
                // if(event.includes('whats')) {
                //     if(!swalShouldRun()) continue;                 
                //     this.#buildSwal(othersGesturesIcon)
                // }  
                //console.log(othersGesturesIcon);
                //Aula 03 - Reconhecer gestos de mãos individuais e printar no log
                if(event.includes('no-event')) {

                }

                if(event.includes('click')) {
                    if(!clickShouldRun()) continue;
                    this.#view.clickOnElement(x, y)
                }
            }
        } catch(error) {
            console.log('deu ruim mano!', error)
        }
    }

    async #loop() {        
        await this.#service.initializeDetector()
        await this.#estimateHands()
        this.#view.loop(this.#loop.bind(this))
    }
    
    static async initialize(deps) {
        const controller = new HandGestureController(deps)
        return controller.init()
    }
}