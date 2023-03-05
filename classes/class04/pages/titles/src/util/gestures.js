const { GestureDescription, Finger, FingerCurl, FingerDirection } = window.fp; 
const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐
const WhatsUpGesture = new GestureDescription('whats-up'); //🤙
const NoEventGesture = new GestureDescription('no-event'); //🤟
const ClickGesture = new GestureDescription('click'); //🤏

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
}

// Aula 02 - Reconhecer gestos de mãos individuais e printar no log
//What's up signal
// -----------------------------------------------------------------------------
  
// thumb: no curled
NoEventGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
NoEventGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
NoEventGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
NoEventGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
NoEventGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
NoEventGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);

NoEventGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
NoEventGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
NoEventGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpLeft, 1.0);
NoEventGesture.addDirection(Finger.Pinky, FingerDirection.DiagonalUpRight, 1.0);
NoEventGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalLeft, 1.0);
NoEventGesture.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 1.0);

NoEventGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
NoEventGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
NoEventGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
NoEventGesture.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
NoEventGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
NoEventGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// all other fingers: curled
for(let finger of [Finger.Middle, Finger.Ring]) {
    NoEventGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
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

// Click
// -----------------------------------------------------------------------------
ClickGesture.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.8)
ClickGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 0.5)

ClickGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
ClickGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.4)

ClickGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 0.9)

ClickGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.9)

ClickGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.9)

ClickGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 1.0)
ClickGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.9)





const knowGesture = [
    ScrollDownGesture, 
    ScrollUpGesture,
    WhatsUpGesture,
    ClickGesture,
    NoEventGesture
]

const gestureStrings = {
    'scroll-up': '🖐',
    'scroll-down': '✊️',
    'whats-up': '🤙',
    'click': '🤏',
    'no-event': '🤟'
}

export {
    knowGesture,
    gestureStrings
}