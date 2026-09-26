
import { StyleSheet } from 'react-native';

export const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 30,
  },

  grid: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#1E293B',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },

  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
    fontSize: 23,
    fontWeight: '600',
    color: '#1E293B',
  },

  cellCorrect: {

    backgroundColor: '#FFFFFF',
  },

  cellIncorrect: {
    backgroundColor: 'rgb(245, 123, 123)',
  },

  boxRight: {
    borderRightWidth: 3,
    borderRightColor: '#1E293B',
  },

  boxBottom: {
    borderBottomWidth: 3,
    borderBottomColor: '#1E293B',
  },

  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 10,
    marginTop: 35,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
