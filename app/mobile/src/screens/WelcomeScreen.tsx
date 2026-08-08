import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>f</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F4'
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
    backgroundColor: '#E8754D',
    shadowColor: '#A74E30',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 6
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 62
  },
  title: {
    marginTop: 24,
    color: '#2C1C17',
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: -1
  },
  subtitle: {
    maxWidth: 300,
    marginTop: 12,
    color: '#725F58',
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
    backgroundColor: '#F8DED3',
    color: '#A64D2D',
    fontSize: 14,
    fontWeight: '700'
  }
});
