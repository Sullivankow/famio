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
import { SafeAreaView } from 'react-native-safe-area-context';

import { type AppColors, useAppTheme } from '../theme/ThemeContext';

export function SignUpScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme.colors);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const passwordsMatch = password === passwordConfirmation;
  const isFormValid = firstName.trim().length > 0 && isEmailValid && isPasswordValid && passwordsMatch;

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
              <Text style={styles.stepText}>PREMIÈRE ÉTAPE</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.heading}>
            <Text style={styles.title}>Créons votre espace familial.</Text>
            <Text style={styles.subtitle}>
              Quelques informations suffisent pour commencer à partager vos plus beaux moments.
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              autoCapitalize="words"
              autoComplete="given-name"
              label="Votre prénom"
              onChangeText={setFirstName}
              placeholder="Ex. Camille"
              styles={styles}
              value={firstName}
            />
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
              autoComplete="new-password"
              error={hasSubmitted && !isPasswordValid ? 'Utilisez au moins 8 caractères.' : undefined}
              label="Mot de passe"
              onChangeText={setPassword}
              placeholder="8 caractères minimum"
              secureTextEntry
              styles={styles}
              value={password}
            />
            <Field
              autoComplete="new-password"
              error={hasSubmitted && !passwordsMatch ? 'Les mots de passe ne correspondent pas.' : undefined}
              label="Confirmer le mot de passe"
              onChangeText={setPasswordConfirmation}
              placeholder="Répétez votre mot de passe"
              secureTextEntry
              styles={styles}
              value={passwordConfirmation}
            />
          </View>

          <Pressable
            accessibilityHint="Vérifie les informations saisies avant la création du compte"
            accessibilityRole="button"
            onPress={() => setHasSubmitted(true)}
            style={({ pressed }) => [
              styles.submitButton,
              !isFormValid && styles.submitButtonDisabled,
              pressed && isFormValid && styles.submitButtonPressed,
            ]}
          >
            <Text style={styles.submitButtonText}>Créer mon compte</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>

          {hasSubmitted && isFormValid && (
            <Text style={styles.readyMessage}>
              Tout est prêt. La création du compte sera connectée au service d’authentification à l’étape suivante.
            </Text>
          )}

          <Text style={styles.legalText}>
            En continuant, vous acceptez de créer un espace privé réservé à votre famille.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ScreenStyles = ReturnType<typeof createStyles>;

type FieldProps = Readonly<{
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: 'email' | 'given-name' | 'new-password';
  error?: string;
  keyboardType?: 'default' | 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  styles: ScreenStyles;
  value: string;
}>;

function Field({ error, label, styles, ...inputProps }: FieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={styles.placeholder.color}
        style={[styles.input, error && styles.inputError]}
        {...inputProps}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

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
  submitButton: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 30, borderRadius: 18, backgroundColor: colors.primary, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 14, elevation: 4 },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonPressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.985 }] },
  submitButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  buttonArrow: { color: colors.onPrimary, fontSize: 21, fontWeight: '600' },
  readyMessage: { marginTop: 14, color: colors.success, fontSize: 13, lineHeight: 19, textAlign: 'center' },
  legalText: { marginTop: 20, paddingHorizontal: 10, color: colors.textSecondary, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
