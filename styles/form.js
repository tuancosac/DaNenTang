import {
  StyleSheet, Dimensions, Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');
const verticalScale = (size) => (height / 812) * size;
const isTabletOrWeb = width > 500;
const isLargeScreen = width > 768;
export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: width > 500 ? 48 : 24,
    paddingVertical: verticalScale(40),
  },
  formContainer: {
    backgroundColor: 'rgba(15, 15, 30, 0.75)',
    borderRadius: 24,
    paddingVertical: isTabletOrWeb ? 40 : 28,
    paddingHorizontal: isTabletOrWeb ? 40 : 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    width: '100%',
    maxWidth: isLargeScreen ? 560 : isTabletOrWeb ? 480 : '100%', // rộng hơn trước
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    color: '#d1d5db',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 15,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
      },
    }),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  loginLink: {
    color: '#818cf8',
    fontSize: 14,
    fontWeight: '600',
  },
});