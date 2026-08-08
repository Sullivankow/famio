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

/** Affiche la demande de réinitialisation du mot de passe. */
export function ForgotPasswordScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme.colors);
  const [email, setEmail] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const isEmailValid = /^\S+@\S+\.\S+$/.test(email);

  /** Valide l’adresse saisie et affiche la confirmation d’envoi lorsque celle-ci est correcte. */
  function handleResetRequest() {
    setHasSubmitted(true);

    if (isEmailValid) {
      setIsEmailSent(true);
    }
  }

  /** Réaffiche le formulaire afin de permettre la saisie d’une autre adresse e-mail. */
  function handleUseAnotherEmail() {
    setHasSubmitted(false);
    setIsEmailSent(false);
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
              accessibilityHint="Revient à l'écran de connexion"
              accessibilityLabel="Retour"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
            >
              <Text style={styles.backArrow}>‹</Text>
            </Pressable>
            <View style={styles.stepPill}>
              <Text style={styles.stepText}>AIDE À LA CONNEXION</Text>
            </View>
            <View style={styles.headerSpacer} />
          </View>

          {isEmailSent ? (
            <View style={styles.successContent}>
              <View style={styles.mailIcon} accessibilityRole="image" accessibilityLabel="Enveloppe">
                <Text style={styles.mailSymbol}>✉</Text>
              </View>
              <Text style={styles.title}>Vérifiez vos e-mails.</Text>
              <Text style={styles.subtitle}>
                Si un compte Famio est associé à {email}, un lien de réinitialisation vient de vous être envoyé.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [styles.submitButton, pressed && styles.submitButtonPressed]}
              >
                <Text style={styles.submitButtonText}>Retour à la connexion</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={handleUseAnotherEmail} style={styles.textButton}>
                <Text style={styles.textButtonText}>Utiliser une autre adresse</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <View style={styles.heading}>
                <Text style={styles.title}>Mot de passe oublié ?</Text>
                <Text style={styles.subtitle}>
                  Indiquez votre adresse e-mail : nous vous enverrons un lien pour choisir un nouveau mot de passe.
                </Text>
              </View>

              <View style={styles.form}>
                <Text style={styles.label}>Adresse e-mail</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="vous@exemple.fr"
                  placeholderTextColor={styles.placeholder.color}
                  style={[styles.input, hasSubmitted && !isEmailValid && styles.inputError]}
                  value={email}
                />
                {hasSubmitted && !isEmailValid && (
                  <Text style={styles.errorText}>Saisissez une adresse e-mail valide.</Text>
                )}
              </View>

              <Pressable
                accessibilityHint="Envoie un lien de réinitialisation à cette adresse"
                accessibilityRole="button"
                onPress={handleResetRequest}
                style={({ pressed }) => [
                  styles.submitButton,
                  !isEmailValid && styles.submitButtonDisabled,
                  pressed && isEmailValid && styles.submitButtonPressed,
                ]}
              >
                <Text style={styles.submitButtonText}>Envoyer le lien</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </Pressable>

              <Text style={styles.reassurance}>
                Pour votre sécurité, nous ne confirmons pas l’existence d’un compte associé à cette adresse.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** Construit les styles de l’écran à partir des couleurs du thème actif. */
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
  stepText: { color: colors.primaryPressed, fontSize: 10, fontWeight: '800', letterSpacing: 0.75 },
  heading: { marginTop: 36 },
  successContent: { flex: 1, alignItems: 'center', paddingTop: 62 },
  mailIcon: { width: 82, height: 82, alignItems: 'center', justifyContent: 'center', marginBottom: 30, borderRadius: 27, backgroundColor: colors.primarySoft },
  mailSymbol: { marginTop: -3, color: colors.primary, fontSize: 42 },
  title: { maxWidth: 330, color: colors.textPrimary, fontSize: 34, fontWeight: '800', letterSpacing: -1.3, lineHeight: 40 },
  subtitle: { maxWidth: 340, marginTop: 13, color: colors.textSecondary, fontSize: 16, lineHeight: 24 },
  form: { marginTop: 34 },
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
  textButton: { marginTop: 19, paddingVertical: 6 },
  textButtonText: { color: colors.primaryPressed, fontSize: 14, fontWeight: '800' },
  reassurance: { marginTop: 20, paddingHorizontal: 10, color: colors.textSecondary, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
