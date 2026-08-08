import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../navigation/AppNavigator';
import { type AppColors, useAppTheme } from '../theme/ThemeContext';

/** Affiche le formulaire permettant à un membre de retrouver son espace familial. */
export function SignInScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = createStyles(theme.colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(email);
  const isPasswordValid = password.length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  /** Déclenche l'affichage des erreurs avant le raccordement à l'authentification. */
  function handleSubmit() {
    setHasSubmitted(true);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', default: undefined })}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.topRow}>
            <Pressable
              accessibilityHint="Revient à l'écran d'accueil"
              accessibilityLabel="Retour"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            >
              <Text style={styles.backArrow}>‹</Text>
            </Pressable>
            <View style={styles.stepPill}>
              <Text style={styles.stepText}>BON RETOUR</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Ravis de vous revoir.</Text>
            <Text style={styles.subtitle}>
              Connectez-vous pour retrouver les moments précieux de votre famille.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              autoCapitalize="none"
              autoComplete="email"
              error={hasSubmitted && !isEmailValid ? 'Saisissez une adresse e-mail valide.' : undefined}
              keyboardType="email-address"
              label="Adresse e-mail"
              onChangeText={setEmail}
              placeholder="vous@exemple.fr"
              styles={styles}
              value={email}
            />
            <Field
              autoComplete="current-password"
              error={hasSubmitted && !isPasswordValid ? 'Saisissez votre mot de passe.' : undefined}
              label="Mot de passe"
              onChangeText={setPassword}
              placeholder="Votre mot de passe"
              secureTextEntry
              styles={styles}
              value={password}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotButtonText}>Mot de passe oublié ?</Text>
          </Pressable>

          <Pressable
            accessibilityHint="Vérifie vos identifiants avant la connexion"
            accessibilityRole="button"
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              !isFormValid && styles.submitButtonDisabled,
              pressed && isFormValid && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitButtonText}>Me connecter</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>

          {Boolean(hasSubmitted && isFormValid) && (
            <Text style={styles.readyMessage}>
              Tout est prêt. La connexion sera reliée au service d’authentification à l’étape suivante.
            </Text>
          )}

          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Vous n’avez pas encore de compte ?</Text>
            <Pressable accessibilityRole="button" onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Créer mon espace</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ScreenStyles = ReturnType<typeof createStyles>;

type FieldProps = Readonly<{
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'current-password';
  error?: string;
  keyboardType?: 'default' | 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  styles: ScreenStyles;
  value: string;
}>;

/** Rend un champ du formulaire et son message de validation éventuel. */
function Field({ error, label, styles, ...inputProps }: FieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={styles.placeholder.color}
        style={[styles.input, error && styles.inputError]}
        {...inputProps}
      />
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/** Construit les styles à partir des couleurs du thème actuellement sélectionné. */
const createStyles = (colors: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  keyboardAvoidingView: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 18, paddingBottom: 28 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface },
  backButtonPressed: { backgroundColor: colors.surfaceMuted, transform: [{ scale: 0.94 }] },
  backArrow: { marginTop: -3, color: colors.textPrimary, fontSize: 31, fontWeight: '400', lineHeight: 31 },
  headerSpacer: { width: 40 },
  stepPill: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: colors.primarySoft },
  stepText: { color: colors.primaryPressed, fontSize: 10, fontWeight: '800', letterSpacing: 0.9 },
  heading: { marginTop: 36 },
  title: { maxWidth: 320, color: colors.textPrimary, fontSize: 34, fontWeight: '800', letterSpacing: -1.3, lineHeight: 40 },
  subtitle: { maxWidth: 340, marginTop: 13, color: colors.textSecondary, fontSize: 16, lineHeight: 24 },
  form: { marginTop: 34, gap: 18 },
  label: { marginBottom: 8, color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  input: { minHeight: 56, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 16, backgroundColor: colors.surface, color: colors.textPrimary, fontSize: 16 },
  inputError: { borderColor: colors.error },
  placeholder: { color: colors.textSecondary },
  errorText: { marginTop: 6, color: colors.error, fontSize: 12, fontWeight: '600' },
  forgotButton: { alignSelf: 'flex-end', marginTop: 15, paddingVertical: 4 },
  forgotButtonText: { color: colors.primaryPressed, fontSize: 13, fontWeight: '700' },
  submitButton: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 24, borderRadius: 18, backgroundColor: colors.primary, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 14, elevation: 4 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonPressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.985 }] },
  submitButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  buttonArrow: { color: colors.onPrimary, fontSize: 21, fontWeight: '600' },
  readyMessage: { marginTop: 14, color: colors.success, fontSize: 13, lineHeight: 19, textAlign: 'center' },
  signUpRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, marginTop: 28 },
  signUpText: { color: colors.textSecondary, fontSize: 13 },
  signUpLink: { color: colors.primaryPressed, fontSize: 13, fontWeight: '800' },
});
