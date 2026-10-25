# Modal with Rendered Image

A React Native (Expo) image gallery that opens the selected image in a `Modal`.

## Features

- Two-column image grid built with `FlatList`
- Renders both remote images (`{ uri }`) and a local bundled image (`require(...)`)
- Tapping an image opens a `Modal` that renders the image full width with its title and description
- Loading spinner (`ActivityIndicator`) while the image loads
- Close button, and the Android back button closes the modal (`onRequestClose`)

## Run it

```bash
npm install
npx expo start
```

Scan the QR code with the Expo Go app (Android/iOS), or press `a` for an Android emulator / `w` for web.
