import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function ResultImc(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.informacao}>{props.mensagem}</Text>
      <Text style={styles.resultado}>{props.resultado}</Text>
    </View>
  );
}
