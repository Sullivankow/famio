import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Mode effectivement appliqué à l'interface.
export type ThemeMode = 'light' | 'dark';
// Choix mémorisable de l'utilisateur : suivre l'appareil ou imposer un mode.
export type ThemePreference = ThemeMode | 'system';

// Tokens sémantiques utilisés dans les écrans, afin d'éviter les couleurs écrites en dur.
export type AppColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  primary: string;
  primaryPressed: string;
  primarySoft: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  onPrimary: string;
  shadow: string;
};

export type AppTheme = {
  mode: ThemeMode;
  colors: AppColors;
};

// Valeur exposée à tous les composants qui consomment le thème.
type ThemeContextValue = {
  theme: AppTheme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

// Palette par défaut de Famio pour les interfaces claires.
const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    background: '#FFF8F4',
    surface: '#FFFFFF',
    surfaceMuted: '#F8DED3',
    primary: '#E8754D',
    primaryPressed: '#A64D2D',
    primarySoft: '#F8DED3',
    textPrimary: '#2C1C17',
    textSecondary: '#725F58',
    border: '#EBDDD7',
    success: '#4F8A6B',
    error: '#BA3B46',
    onPrimary: '#FFFFFF',
    shadow: '#A74E30',
  },
};

// Équivalent sombre de la palette claire, prêt à être activé par le système ou les réglages.
const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    background: '#211714',
    surface: '#30211C',
    surfaceMuted: '#4B3026',
    primary: '#F08C68',
    primaryPressed: '#FFC0A9',
    primarySoft: '#4B3026',
    textPrimary: '#FFF8F4',
    textSecondary: '#D8C1B7',
    border: '#594038',
    success: '#7CC69B',
    error: '#FF8E96',
    onPrimary: '#2C1C17',
    shadow: '#000000',
  },
};

// Le contexte est volontairement nul hors du fournisseur afin de détecter une mauvaise utilisation.
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  // useColorScheme réagit aux changements de réglage clair/sombre de l'appareil.
  const systemMode = useColorScheme() === 'dark' ? 'dark' : 'light';
  // La préférence pourra être pilotée plus tard depuis un écran de réglages.
  const [preference, setPreference] = useState<ThemePreference>('system');
  const mode = preference === 'system' ? systemMode : preference;
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  // La valeur mémorisée évite de redéclencher inutilement les composants consommateurs.
  const value = useMemo(
    () => ({ theme, preference, setPreference }),
    [preference, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Point d'accès unique au thème dans les écrans et composants de l'application.
export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }

  return context;
}
