import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDirection } from '../utils/getDirection';
import { LocationData } from '../hooks/useLocation';

interface Props {
  heading: number;
  loc: LocationData;
}

function dms(v: number | null, lat = true) {
  if (v == null) return '--';
  const abs = Math.abs(v);
  const d   = Math.floor(abs);
  const mF  = (abs - d) * 60;
  const m   = Math.floor(mF);
  const s   = Math.round((mF - m) * 60);
  const dir = lat ? (v >= 0 ? 'N' : 'S') : (v >= 0 ? 'E' : 'W');
  return `${d}°${String(m).padStart(2,'0')}'${String(s).padStart(2,'0')}" ${dir}`;
}

const InfoPanel: React.FC<Props> = ({ heading, loc }) => (
  <View style={s.wrap}>
    <Text style={s.deg}>{heading.toFixed(0)}° {getDirection(heading)}</Text>
    <Text style={s.meta}>{dms(loc.lat,true)}   {dms(loc.lon,false)}</Text>
    {loc.city &&  <Text style={s.meta}>{loc.city}</Text>}
    {loc.alt!=null&&<Text style={s.meta}>{loc.alt.toFixed(0)} m Elevation</Text>}
  </View>
);

export default React.memo(InfoPanel);

const s = StyleSheet.create({
  wrap:{alignItems:'center',marginTop:32},
  deg :{fontSize:66,color:'#fff',fontWeight:'200'},
  meta:{color:'#999',fontSize:14,marginTop:2},
});
