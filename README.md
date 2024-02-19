This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

### Use This sample data for testing
```bash
[
    {
      "id": "95a2aaca-bab8-4504-8646-f75b325ec0e7",
      "booked": true,
      "area": "Helsinki",
      "startTime":Date.now()+2*60*60*1000,
      "endTime": Date.now()+4*60*60*1000
    },
    {
      "id": "95a2aaca-cab8-4504-8646-f75b325ec0e7",
      "booked": false,
      "area": "Helsinki",
      "startTime":Date.now()+3*60*60*1000,
      "endTime": Date.now()+5*60*60*1000
    },
    {
      "id": "001e40e5-05dc-4b9d-bdc5-cae63f651970",
      "booked": true,
      "area": "Tampere",
      "startTime": 1523602800000,
      "endTime": 1523610000000
    }
  ]
  ```

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
