
import { StyleSheet } from 'react-native';

export const scanStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,

  },

  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 24,
    gap: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginVertical: 16,
  },

  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },

  camera: {
    flex: 1,
  },

  guideOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  guideSquare: {
    width: '95%',
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: '#4ADE80',
    borderRadius: 4,
    overflow: 'hidden',
  },

  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },

  gridCell: {
    flex: 1,
  },

  thinRight: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(74, 222, 128, 0.8)',
  },

  thickRight: {
    borderRightWidth: 3,
    borderRightColor: '#4ADE80',
  },

  thinBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 222, 128, 0.8)',
  },

  thickBottom: {
    borderBottomWidth: 3,
    borderBottomColor: '#4ADE80',
  },

  actions: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  message: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 16,
  },

  alignCenter: {
    alignItems: 'center',
  },
});