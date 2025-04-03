// headerStyles.js
import { StyleSheet, Platform, StatusBar } from 'react-native';

// Define your app's color palette
const COLORS = {
  primary: '#1a367b',        // Deep blue
  secondary: '#4f85e5',      // Light blue
  accent: '#ff7b25',         // Orange
  background: '#f5f7fa',     // Light gray
  white: '#ffffff',
  danger: '#e74c3c',         // Red for errors
  success: '#2ecc71',        // Green for success
  textDark: '#2d3436',
  textLight: '#636e72',
};

// Create reusable header styles
const headerStyles = StyleSheet.create({
  // Main header container
  headerContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight + 10,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  // Logo container
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Logo text
  logoText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // Secure connection indicator - green when secure
  secureConnectionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  
  // Circle indicator for connection status
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  
  // Status dot colors
  secureDot: {
    backgroundColor: COLORS.success,
  },
  
  insecureDot: {
    backgroundColor: COLORS.danger,
  },
  
  // Status text
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Back button for inner screens
  backButton: {
    padding: 8,
  },
  
  // Back button icon size
  backIcon: {
    width: 24,
    height: 24,
  },
  
  // Header title for inner screens
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  
  // Right action button container
  actionButton: {
    padding: 8,
  },
  
  // Profile avatar container
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  
  // Profile avatar text (initials)
  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Profile avatar image
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  
  // Badge for notifications
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  
  // Badge text
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  // Subtitle text in header
  headerSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
});

// Export the styles and colors
export { headerStyles, COLORS };