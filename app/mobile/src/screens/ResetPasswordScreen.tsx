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

/** Permet à l’utilisateur de choisir un nouveau mot de passe après avoir ouvert son lien sécurisé. */
export function ResetPasswordScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = createStyles(theme.colors);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const isPasswordValid = password.length >= 8;
  const passwordsMatch = password === passwordConfirmation;
  const isFormValid = isPasswordValid && passwordsMatch;

  /** Vérifie les deux mots de passe avant d’afficher la confirmation de modification. */
  function handlePasswordReset() {
    setHasSubmitted(true);

    if (isFormValid) {
      setIsPasswordUpdated(true);
    }
  }

  /** Ramène l’utilisateur à la connexion une fois son mot de passe modifié. */
  function handleReturnToSignIn() {
    navigation.popTo('SignIn');
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
              accessibilityHint="Revient à l'écran précédent"
              accessibilityLabel="Retour"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            >
              <Text style={styles.backArrow}>‹</Text>
            </Pressable>
            <View style={styles.stepPill}>
              <Text style={styles.stepText}>NOUVEAU MOT DE PASSE</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          {isPasswordUpdated ? (
            <View style={styles.successContent}>
              <View style={styles.successIcon} accessibilityRole="image" accessibilityLabel="Mot de passe mis à jour">
                <Text style={styles.successSymbol}>✓</Text>
              </View>
              <Text style={styles.title}>Mot de passe modifié.</Text>
              <Text style={styles.subtitle}>
                Votre nouveau mot de passe est enregistré. Vous pouvez maintenant vous connecter à Famio.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={handleReturnToSignIn}
                style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
              >
                <Text style={styles.submitButtonText}>Me connecter</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <View style={styles.heading}>
                <Text style={styles.title}>Créez un nouveau mot de passe.</Text>
                <Text style={styles.subtitle}>
                  Choisissez un mot de passe sûr, différent de ceux que vous utilisez habituellement.
                </Text>
              </View>

              <View style={styles.form}>
                <PasswordField
                  error={hasSubmitted && !isPasswordValid ? 'Utilisez au moins 8 caractères.' : undefined}
                  label="Nouveau mot de passe"
                  onChangeText={setPassword}
                  placeholder="8 caractères minimum"
                  styles={styles}
                  value={password}
                />
                <PasswordField
                  error={hasSubmitted && !passwordsMatch ? 'Les mots de passe ne correspondent pas.' : undefined}
                  label="Confirmer le nouveau mot de passe"
                  onChangeText={setPasswordConfirmation}
                  placeholder="Répétez votre mot de passe"
                  styles={styles}
                  value={passwordConfirmation}
                />
              </View>

              <Pressable
                accessibilityHint="Vérifie et enregistre votre nouveau mot de passe"
                accessibilityRole="button"
                onPress={handlePasswordReset}
                style={({ pressed }) => [
                  styles.submitButton,
                  !isFormValid && styles.submitButtonDisabled,
                  pressed && isFormValid && styles.submitButtonPressed,
                ]}
              >
                <Text style={styles.submitButtonText}>Enregistrer le mot de passe</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ScreenStyles = ReturnType<typeof createStyles>;

type PasswordFieldProps = Readonly<{
  error?: string;
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  styles: ScreenStyles;
  value: string;
}>;

/** Rend un champ sécurisé dédié à la saisie ou à la confirmation du mot de passe. */
function PasswordField({ error, label, styles, ...inputProps }: PasswordFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoComplete="new-password"
        placeholderTextColor={styles.placeholder.color}
        secureTextEntry
        style={[styles.input, error ? styles.inputError : undefined]}
        {...inputProps}
      />
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/** Construit les styles de la page à partir des couleurs du thème actif. */
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
  stepText: { color: colors.primaryPressed, fontSize: 10, fontWeight: '800', letterSpacing: 0.65 },
  heading: { marginTop: 36 },
  successContent: { flex: 1, alignItems: 'center', paddingTop: 62 },
  successIcon: { width: 82, height: 82, alignItems: 'center', justifyContent: 'center', marginBottom: 30, borderRadius: 27, backgroundColor: colors.primarySoft },
  successSymbol: { color: colors.primary, fontSize: 44, fontWeight: '800' },
  title: { maxWidth: 340, color: colors.textPrimary, fontSize: 34, fontWeight: '800', letterSpacing: -1.3, lineHeight: 40 },
  subtitle: { maxWidth: 340, marginTop: 13, color: colors.textSecondary, fontSize: 16, lineHeight: 24 },
  form: { marginTop: 34, gap: 18 },
  label: { marginBottom: 8, color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  input: { minHeight: 56, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 16, backgroundColor: colors.surface, color: colors.textPrimary, fontSize: 16 },
  inputError: { borderColor: colors.error },
  placeholder: { color: colors.textSecondary },
  errorText: { marginTop: 6, color: colors.error, fontSize: 12, fontWeight: '600' },
  submitButton: { width: '100%', minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 30, borderRadius: 18, backgroundColor: colors.primary, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 14, elevation: 4 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonPressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.985 }] },
  submitButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  buttonArrow: { color: colors.onPrimary, fontSize: 21, fontWeight: '600' },
});
