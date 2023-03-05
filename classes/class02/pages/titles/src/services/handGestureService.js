import { knowGesture, gestureStrings } from "../util/gestures.js"

export default class HandGestureService {
    #gestureEstimator
    #handPoseDetection 
    #handsVersion
    #detector = null

    constructor({ fingerpose, handPoseDetection, handsVersion }) {
        this.#gestureEstimator = new fingerpose.GestureEstimator(knowGesture)
        this.#handPoseDetection = handPoseDetection
        this.#handsVersion = handsVersion
    }

    async estimate(keypoints3D) {
        const preditions = await this.#gestureEstimator.estimate(
            this.#getLandMarksFromKeyPoints(keypoints3D),
            // % de confianca gesto (90%)
            9    
        )
        return preditions.gestures
        //console.log({ preditions })
    }

    async * detectGestures(preditions) {
        for(const hand of preditions) {
            if(!hand.keypoints3D) continue

            const gestures = await this.estimate(hand.keypoints3D)
            //console.log({ gestures })
            //console.log({result})
            //console.log(hand.keypoints)
            //console.log(result)
            if(!gestures.length) continue
            const result = gestures.reduce((previous, current) => (previous.score > current.score) ? previous : current)
            const {x, y} = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip')
            
            // Aula 02 - Reconhecer gestos de mãos individuais e printar no log
            const othersGesturesIcon = gestureStrings[result.name]

            yield { event: result.name, x, y, othersGesturesIcon }
            console.warn('detect', gestureStrings[result.name])
        }
    }

    #getLandMarksFromKeyPoints(keypoints3D) {
        return keypoints3D.map(keypoint => 
            [keypoint.x, keypoint.y, keypoint.x])
    }

    async estimateHands(video) {
        return this.#detector.estimateHands(video, {
            flipHorizontal: true
        })
    }

    async initializeDetector() {
        if(this.#detector) return this.#detector

        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
            //mais pessado e mais precisso
            modelType: 'lite',
            maxHands: 2,
        }
        this.#detector = await this.#handPoseDetection.createDetector(
            this.#handPoseDetection.SupportedModels.MediaPipeHands, 
            detectorConfig
        )

        return this.#detector
    }
}