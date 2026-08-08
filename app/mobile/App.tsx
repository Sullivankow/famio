import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';

export default function App() {
  return (
    // Rend le thème disponible dans toute l'application, y compris la navigation.
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useAppTheme();

  return (
    <SafeAreaProvider>
      {/* Les icônes de la barre système restent lisibles sur le fond actif. */}
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
