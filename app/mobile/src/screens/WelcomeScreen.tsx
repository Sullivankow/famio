import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type AppColors, useAppTheme } from '../theme/ThemeContext';

export function WelcomeScreen() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme.colors);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.logo} accessibilityRole="image" accessibilityLabel="Famio">
          <View style={[styles.person, styles.personLeft]}>
            <View style={styles.adultHead} />
            <View style={styles.adultBody} />
          </View>
          <View style={[styles.person, styles.personRight]}>
            <View style={styles.adultHead} />
            <View style={styles.adultBody} />
          </View>
          <View style={[styles.person, styles.personCenter]}>
            <View style={styles.childHead} />
            <View style={styles.childBody} />
          </View>
        </View>
        <Text style={styles.title}>Famio</Text>
        <Text style={styles.subtitle}>
          L'espace privé où votre famille partage ses plus beaux moments.
        </Text>
        <Text style={styles.badge}>Bientôt disponible</Text>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: AppColors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  logo: {
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    backgroundColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6
  },
  person: {
    position: 'absolute',
    alignItems: 'center',
  },
  personLeft: {
    top: 18,
    left: 15,
  },
  personRight: {
    top: 18,
    right: 15,
  },
  personCenter: {
    top: 32,
    left: 34,
  },
  adultHead: {
    width: 13,
    height: 13,
    borderRadius: 999,
    backgroundColor: colors.onPrimary,
  },
  adultBody: {
    width: 21,
    height: 16,
    marginTop: 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.onPrimary,
  },
  childHead: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.onPrimary,
  },
  childBody: {
    width: 15,
    height: 11,
    marginTop: 2,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    backgroundColor: colors.onPrimary,
  },
  title: {
    marginTop: 24,
    color: colors.textPrimary,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1
  },
  subtitle: {
    maxWidth: 300,
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 17,
    lineHeight: 25,
    textAlign: 'center'
  },
  badge: {
    marginTop: 32,
    paddingHorizontal: 16,
    paddingVertical: 9,
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    color: colors.primaryPressed,
    fontSize: 14,
    fontWeight: '700'
  }
});
