import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  base: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 280,
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: '600',
  },
});