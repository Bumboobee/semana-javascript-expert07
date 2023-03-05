import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.js"
import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js"
import "https://cdn.jsdelivr.net/npm/sweetalert2@10"

import HandGestureController from "../controllers/handGestureController.js"
import HandGestureService from "../services/handGestureService.js"
import HandGestureView from "../views/handGestureView.js"
import Camera from "../../../../lib/shared/camera.js"
import { fingerLookupIndexes, gestureStrings, knowGesture } from "../util/util.js"
const camera = await Camera.init()

// const [rootPath] = window.location.href.split('/pages/')
const factory = {
  async initalize() {
    return HandGestureController.initialize({
      camera,
      view: new HandGestureView({
        swal: window.Sweetalert2,
        fingerLookupIndexes
      }),
      service: new HandGestureService({
        gestureStrings, 
        knowGesture,
        fingerpose: window.fp,
        handPoseDetection: window.handPoseDetection,
        handsVersion: window.VERSION
      })
    })
  }
}

export default factory