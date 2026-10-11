import { StyleSheet } from 'react-native';

export const successStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  checkMark: {
    color: '#FFFFFF',
    fontSize: 72,
    fontWeight: '700',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
  },

  subtitle: {
    fontSize: 22,
    fontWeight: '600'
  }
});