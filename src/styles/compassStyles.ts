import { StyleSheet } from 'react-native';

export const DIAL_SIZE  = 350;
export const TICK_COUNT = 180;          // Thinner, denser ticks

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },

  dialContainer: { width: DIAL_SIZE, height: DIAL_SIZE, alignItems: 'center', justifyContent: 'center' },
  dialWrapper:  { width: DIAL_SIZE, height: DIAL_SIZE, borderRadius: DIAL_SIZE / 2, overflow: 'hidden' },

notch: {
  position: 'absolute',
  top: 5,                      
  width: 5,                    
  height: 40,                  
  backgroundColor: '#fff',
  borderRadius: 1.5,
},

crosshairVertical: {
  position: 'absolute',
  width: 1,
  height: DIAL_SIZE * 0.2,              
  backgroundColor: '#666',             
  top: DIAL_SIZE * 0.4,                
},

crosshairHorizontal: {
  position: 'absolute',
  height: 1,
  width: DIAL_SIZE * 0.2,              
  backgroundColor: '#666',
  left: DIAL_SIZE * 0.4,
},



  ticksContainer: { position: 'absolute', width: DIAL_SIZE, height: DIAL_SIZE, alignItems: 'center', justifyContent: 'center' },

  loadingContainer: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  loadingText:      { marginTop: 10, color: '#aaa', fontSize: 16 },
});
