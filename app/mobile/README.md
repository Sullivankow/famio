# Famio Mobile

Application mobile Expo / React Native de Famio, pensée pour être testée directement avec Expo Go.

## Prérequis

- Node.js 20.19 ou supérieur
- pnpm 10 ou supérieur (`corepack enable` puis `corepack prepare pnpm@10.14.0 --activate`)
- L'application **Expo Go** sur le téléphone

## Démarrage

Depuis la racine du dépôt :

```bash
pnpm install
pnpm mobile
```

Scannez ensuite le QR code affiché avec Expo Go (Android) ou l'appareil photo (iPhone). Le téléphone et l'ordinateur doivent être sur le même réseau Wi-Fi. En cas de réseau restrictif :

```bash
pnpm --filter @famio/mobile start -- --tunnel
```

## Structure

```text
src/
  navigation/    Navigation React Navigation
  screens/       Écrans de l'application
  components/    Composants réutilisables
  services/      Accès à l'API
  hooks/          Hooks partagés
  store/          État global
```
