import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc/";
import styles from "./style";

export default function Form() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imc, setImc] = useState("");
  const [textoBotao, setTextoBotao] = useState("Calcular");
  const [msg, setMsg] = useState("preencha peso e altura");
  const msgAguardandoDados = "*preencha peso e altura";
  const msgResultado = "Seu IMC é igual:";
  const textoBtnCalcular = "Calcular";
  const textoBtnLimparDados = "Limpar Dados";

  function calcularImc() {
    if (peso != "" && altura != "") {
      const a = parseFloat(altura.toString().replace(",", "."));
      const p = parseFloat(peso.toString().replace(",", "."));
      setImc((p / (a * a)).toFixed(2));
      setMsg(msgResultado);
      setTextoBotao(textoBtnLimparDados);
    } else {
      setImc("");
      setTextoBotao(textoBtnCalcular);
      setMsg(msgAguardandoDados);
    }
  }

  function limparDados() {
    setAltura("");
    setPeso("");
    setImc("");
    setTextoBotao(textoBtnCalcular);
    setMsg(msgAguardandoDados);
  }

  function acaoClick() {
    textoBotao == textoBtnLimparDados ? limparDados() : calcularImc();
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={setAltura}
          value={altura}
          placeholder="Ex.: 1,75"
          keyboardType="numeric"
          editable={textoBotao == "Calcular"}
        />
        <Text style={styles.formLabel}>Peso</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={setPeso}
          value={peso}
          placeholder="Ex.: 75,365"
          keyboardType="numeric"
          editable={textoBotao == "Calcular"}
        />
        <TouchableOpacity
          style={styles.formBtnCalculator}
          onPress={() => {
            acaoClick();
          }}
        >
          <Text style={styles.formTextBtnCalculator}>{textoBotao}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc mensagem={msg} resultado={imc?.replace(".", ",")} />
    </View>
  );
}
