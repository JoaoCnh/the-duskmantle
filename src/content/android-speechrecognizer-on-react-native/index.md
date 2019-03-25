---
title: Android SpeechRecognizer on React Native
description: A package to enable SpeechRecognizer for React Native.
date: "2017-07-05"
image: cover.jpeg
tags: ["javascript", "react", "react native", "mobile"]
---

Have you ever wanted to implement a feature on your react-native app where the user can press a button to speak and you do something with the converted text from speech?

Well I got the package for you! (at least for Android 😏)

Introducing **react-native-android-voice!**

[react-native-android-voice](https://www.npmjs.com/package/react-native-android-voice)

[JoaoCnh/react-native-android-voice](https://github.com/JoaoCnh/react-native-android-voice)

This doesn’t support iOS because Apple doesn’t have anything **native** that allows speech recognition. If you must have iOS support I recommend another package/library.

## What is SpeechRecognizer?

It’s this little buddy right here

Normally an Android Input will already have a microphone icon to open the SpeechRecognizer. **What my package allows is to open the SpeechRecognizer on demand and do whatever you want with the return text from your speech!**

## Why did I do this?

Why not?! I know most of the times this use case will be non-existent but **react-native** did not support this out of the box and I figured that someone out there in the world, someday would want this possibility in an easy way.

Got some more experience and knowledge… Guess I didn’t stand to lose nothing by creating it.

## Easy as 1,2,3

```javascript
import SpeechAndroid from 'react-native-android-voice';

...
async _buttonClick() {
    try{
        // THIS EASY!
        var spokenText = await SpeechAndroid.startSpeech("Speak into the Mic!", SpeechAndroid.GERMAN);
        ToastAndroid.show(spokenText , ToastAndroid.LONG);
    }catch(error){
        // DO WHATEVER YOU WANT WITH THE PACKAGE ERROR CODES
    }
}
...
```

Only caveat is: it needs Internet Connection!

But hey we have control right? So on the button click you could check for internet connection and ask for the user to turn it on before using the feature. **Having control is great right?!**

## Feel like contributing?

Wheter it’s new ideas or feature requests it all must be inside the scope of the package itself and possible within the SpeechRecognizer interface from Android.

If so, feel free to fork the project on github and contribute away!

Cheers 🍻
