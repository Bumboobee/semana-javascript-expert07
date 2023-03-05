const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp; 
const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐
const WhatsUpGesture = new GestureDescription('whats-up'); //🤙

// Aula 02 - Reconhecer gestos de mãos individuais e printar no log
//What's up signal
// -----------------------------------------------------------------------------
  
// thumb: no curled
WhatsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
WhatsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
WhatsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
WhatsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
WhatsUpGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
WhatsUpGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

WhatsUpGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
WhatsUpGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
WhatsUpGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
WhatsUpGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
WhatsUpGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
WhatsUpGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);


// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring]) {
    WhatsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    WhatsUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}
  
// Scroll-Dowm
// -----------------------------------------------------------------------------
  
// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Scroll-Up
// -----------------------------------------------------------------------------
  
// no finger should be curled
for(let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
    ScrollUpGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
}

const knowGesture = [
    ScrollDownGesture, 
    ScrollUpGesture,
    WhatsUpGesture
]

const gestureStrings = {
    'scroll-up': '🖐',
    'scroll-down': '✊️',
    'whats-up': '🤙'  
}

export {
    knowGesture,
    gestureStrings
}