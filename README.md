## Compass
A minimal Android-native compass app built with React Native, inspired by Apple's Compass. It provides real-time orientation and location data, along with visual guidance to solar and lunar positions. Designed for clarity, responsiveness, and modern UI standards.


## Features
- Live compass using device orientation sensors
- Current geolocation display (latitude, longitude, altitude)
- Directional indicators for the sun and moon
- Smooth, animated interface (Reanimated 3)
- Optional haptic feedback for key interactions

## Tech Stack
- React Native 0.78 (Hermes enabled)
- Kotlin native module for sensor integration
- @react-native-community/geolocation
- react-native-reanimated v3
- SunCalc (for sun/moon calculations)
- TypeScript, ESLint, and Prettier


## Getting Started
Clone the repository and install dependencies:
```
git clone https://github.com/tayyab3245/android-compass-app.git
cd android-compass-app
npm install
```
Run the app on an Android device:
```
npx react-native run-android
```


## Environment Setup (Only for First-Time Setup)

Make sure you have:
- Node.js (v18+)
- Java JDK 11+

Android Studio with:
- Android SDK & Platform Tools installed
- An emulator created or a physical device connected

Environment variables:
- ANDROID_HOME set correctly
- Add platform-tools to your system PATH

Follow the official React Native environment setup guide (choose "React Native CLI" tab).


## Requirements
- Android Studio (with emulator or physical device)
- Node.js v18+
- Java JDK 11+


## Notes
- Android-only implementation
- Requires physical device for full sensor accuracy
- Built as a UI-focused, functional demo for showcase or interview use