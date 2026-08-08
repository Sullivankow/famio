import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { AppColors } from '../../theme/ThemeContext';

type BurgerMenuProps = Readonly<{
    visible: boolean;
    colors: AppColors;
    onClose: () => void;
    onOpenProfile: () => void;
    onOpenSettings: () => void;
    onGoBack: () => void;
}>;

/**
 * Affiche un menu latéral compact inspiré des applications sociales modernes.
 * Il centralise l’accès au profil, aux réglages, au retour et la fermeture rapide du panneau.
 */
export function BurgerMenu({ visible, colors, onClose, onOpenProfile, onOpenSettings, onGoBack }: BurgerMenuProps) {
    if (!visible) {
        return null;
    }

    return (
        <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable
                    accessibilityRole="menu"
                    onPress={(event) => event.stopPropagation()}
                    style={[styles.panel, { backgroundColor: colors.surface, borderColor: colors.border }]}
                >
                    <View style={styles.header}>
                        <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
                            <Text style={[styles.avatarText, { color: colors.primaryPressed }]}>CM</Text>
                        </View>
                        <View style={styles.headerText}>
                            <Text style={[styles.title, { color: colors.textPrimary }]}>Camille Martin</Text>
                            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Membre de la famille</Text>
                        </View>
                    </View>

                    <Pressable onPress={onOpenProfile} style={[styles.menuItem, { borderColor: colors.border }]}>
                        <Text style={[styles.menuItemTitle, { color: colors.textPrimary }]}>Voir le profil</Text>
                        <Text style={[styles.menuItemHint, { color: colors.textSecondary }]}>Informations, photos et moments</Text>
                    </Pressable>

                    <Pressable onPress={onOpenSettings} style={[styles.menuItem, { borderColor: colors.border }]}>
                        <Text style={[styles.menuItemTitle, { color: colors.textPrimary }]}>Paramètres</Text>
                        <Text style={[styles.menuItemHint, { color: colors.textSecondary }]}>Préférences, sécurité et app</Text>
                    </Pressable>

                    <Pressable onPress={onGoBack} style={[styles.menuItem, { borderColor: colors.border }]}>
                        <Text style={[styles.menuItemTitle, { color: colors.textPrimary }]}>Retour</Text>
                        <Text style={[styles.menuItemHint, { color: colors.textSecondary }]}>Revenir à l’écran précédent</Text>
                    </Pressable>

                    <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: colors.primarySoft }]}>
                        <Text style={[styles.closeButtonText, { color: colors.primaryPressed }]}>Fermer</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(44, 28, 23, 0.28)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 70,
        paddingRight: 14,
    },
    panel: {
        width: 280,
        borderRadius: 22,
        borderWidth: 1,
        padding: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F2E5DF',
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '800',
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 15,
        fontWeight: '800',
    },
    subtitle: {
        marginTop: 2,
        fontSize: 12,
    },
    menuItem: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginTop: 10,
    },
    menuItemTitle: {
        fontSize: 14,
        fontWeight: '700',
    },
    menuItemHint: {
        marginTop: 2,
        fontSize: 12,
        lineHeight: 16,
    },
    closeButton: {
        marginTop: 12,
        borderRadius: 14,
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 13,
        fontWeight: '800',
    },
});
