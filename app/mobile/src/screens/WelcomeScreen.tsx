import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { RootStackParamList } from '../navigation/AppNavigator';
import { type AppColors, useAppTheme } from '../theme/ThemeContext';

/**
 * Affiche l’écran de lancement de l’application avec la présentation de Famio et les actions d’entrée.
 */
export function WelcomeScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = createStyles(theme.colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <FamilyMark styles={styles} />
            <Text style={styles.brandName}>Famio</Text>
          </View>
          <View style={styles.privatePill}>
            <View style={styles.privateDot} />
            <Text style={styles.privatePillText}>Privé</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.memoriesVisual} accessibilityRole="image" accessibilityLabel="Moments partagés en famille">
            <View style={styles.sun} />
            <View style={styles.photoCardBack} />
            <View style={styles.photoCard}>
              <FamilyMark styles={styles} large />
              <View style={styles.photoCaption} />
              <View style={styles.photoCaptionShort} />
            </View>
            <View style={styles.heartBubble}>
              <Text style={styles.heart}>♥</Text>
            </View>
            <View style={styles.dateBubble}>
              <Text style={styles.dateMonth}>AOÛT</Text>
              <Text style={styles.dateDay}>24</Text>
            </View>
          </View>

          <Text style={styles.eyebrow}>VOTRE CERCLE, VOS SOUVENIRS</Text>
          <Text style={styles.title}>Les moments qui comptent, réunis ici.</Text>
          <Text style={styles.subtitle}>
            Partagez photos, nouvelles et instants précieux avec les personnes que vous aimez.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.primaryButtonPressed]}
          >
            <Text style={styles.primaryButtonText}>Créer mon espace familial</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('SignIn')}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
          >
            <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Home')}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
          >
            <Text style={styles.secondaryButtonText}>Voir la home</Text>
          </Pressable>
          <Text style={styles.reassurance}>Un espace intime, réservé à votre famille.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type ScreenStyles = ReturnType<typeof createStyles>;

/**
 * Dessine un petit marqueur visuel représentant une famille pour l’illustration de l’écran d’accueil.
 */
function FamilyMark({ large = false, styles }: Readonly<{ large?: boolean; styles: ScreenStyles }>) {
  return (
    <View style={large ? styles.familyMarkLarge : styles.familyMark} accessibilityElementsHidden>
      <View style={[styles.person, styles.personLeft]}>
        <View style={large ? styles.adultHeadLarge : styles.adultHead} />
        <View style={large ? styles.adultBodyLarge : styles.adultBody} />
      </View>
      <View style={[styles.person, styles.personRight]}>
        <View style={large ? styles.adultHeadLarge : styles.adultHead} />
        <View style={large ? styles.adultBodyLarge : styles.adultBody} />
      </View>
      <View style={[styles.person, styles.personCenter]}>
        <View style={large ? styles.childHeadLarge : styles.childHead} />
        <View style={large ? styles.childBodyLarge : styles.childBody} />
      </View>
    </View>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 22 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandName: { color: colors.textPrimary, fontSize: 22, fontWeight: '800', letterSpacing: -0.7 },
  privatePill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, backgroundColor: colors.primarySoft },
  privateDot: { width: 6, height: 6, borderRadius: 999, backgroundColor: colors.success },
  privatePillText: { color: colors.primaryPressed, fontSize: 12, fontWeight: '700' },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 22 },
  memoriesVisual: { width: 232, height: 216, marginBottom: 30, alignItems: 'center', justifyContent: 'center' },
  sun: { position: 'absolute', width: 178, height: 178, borderRadius: 999, backgroundColor: colors.primarySoft },
  photoCardBack: { position: 'absolute', width: 132, height: 158, borderRadius: 24, backgroundColor: colors.surfaceMuted, transform: [{ rotate: '9deg' }, { translateX: 15 }] },
  photoCard: { width: 142, height: 166, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: colors.primary, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.18, shadowRadius: 18, elevation: 6, transform: [{ rotate: '-5deg' }] },
  photoCaption: { position: 'absolute', bottom: 25, width: 60, height: 6, borderRadius: 999, backgroundColor: colors.primarySoft },
  photoCaptionShort: { position: 'absolute', bottom: 13, width: 38, height: 5, borderRadius: 999, backgroundColor: colors.primarySoft },
  heartBubble: { position: 'absolute', top: 26, left: 13, width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 999, backgroundColor: colors.surface, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  heart: { color: colors.primary, fontSize: 20 },
  dateBubble: { position: 'absolute', right: 5, bottom: 32, width: 49, height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.surface, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  dateMonth: { color: colors.primaryPressed, fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  dateDay: { marginTop: 1, color: colors.textPrimary, fontSize: 20, fontWeight: '800' },
  eyebrow: { color: colors.primaryPressed, fontSize: 11, fontWeight: '800', letterSpacing: 1.15, textAlign: 'center' },
  title: { maxWidth: 340, marginTop: 12, color: colors.textPrimary, fontSize: 37, fontWeight: '800', letterSpacing: -1.5, lineHeight: 43, textAlign: 'center' },
  subtitle: { maxWidth: 330, marginTop: 14, color: colors.textSecondary, fontSize: 16, lineHeight: 24, textAlign: 'center' },
  actions: { width: '100%', marginTop: 30, gap: 12 },
  primaryButton: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, borderRadius: 18, backgroundColor: colors.primary, shadowColor: colors.shadow, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 14, elevation: 4 },
  primaryButtonPressed: { backgroundColor: colors.primaryPressed, transform: [{ scale: 0.985 }] },
  primaryButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  buttonArrow: { color: colors.onPrimary, fontSize: 21, fontWeight: '600' },
  secondaryButton: { minHeight: 52, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 18, backgroundColor: colors.surface },
  secondaryButtonPressed: { backgroundColor: colors.surfaceMuted, transform: [{ scale: 0.985 }] },
  secondaryButtonText: { color: colors.textPrimary, fontSize: 16, fontWeight: '700' },
  reassurance: { marginTop: 3, color: colors.textSecondary, fontSize: 12, textAlign: 'center' },
  familyMark: { width: 30, height: 30, borderRadius: 10, backgroundColor: colors.primary, overflow: 'hidden' },
  familyMarkLarge: { width: 80, height: 80, borderRadius: 22, backgroundColor: colors.primary, overflow: 'hidden' },
  person: { position: 'absolute', alignItems: 'center' },
  personLeft: { top: '31%', left: '16%' },
  personRight: { top: '31%', right: '16%' },
  personCenter: { top: '51%', left: '39%' },
  adultHead: { width: 5, height: 5, borderRadius: 999, backgroundColor: colors.onPrimary },
  adultBody: { width: 8, height: 6, marginTop: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: colors.onPrimary },
  childHead: { width: 4, height: 4, borderRadius: 999, backgroundColor: colors.onPrimary },
  childBody: { width: 6, height: 4, marginTop: 1, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: colors.onPrimary },
  adultHeadLarge: { width: 12, height: 12, borderRadius: 999, backgroundColor: colors.onPrimary },
  adultBodyLarge: { width: 20, height: 15, marginTop: 3, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: colors.onPrimary },
  childHeadLarge: { width: 9, height: 9, borderRadius: 999, backgroundColor: colors.onPrimary },
  childBodyLarge: { width: 14, height: 10, marginTop: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: colors.onPrimary },
});
