import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Vibration,
} from "react-native";
import ResultImc from "./ResultImc/";
import styles from "./style";

export default function Form() {
  const msgAguardandoDados = "preencha peso e altura";
  const msgResultado = "Seu IMC é igual:";
  const textoBtnCalcular = "Calcular";
  const textoBtnLimparDados = "Limpar Dados";
  const textoBtnTentarNovamente = "Tentar novamente";
  const campoObrigatorio = "*campo obrigatório";
  const msgErroPreenchimento = "erro de preenchimento";
  const [altura, setAltura] = useState(null);
  const [peso, setPeso] = useState(null);
  const [imc, setImc] = useState(null);
  const [textoBotao, setTextoBotao] = useState("Calcular");
  const [msg, setMsg] = useState(msgAguardandoDados);
  const [msgErroAltura, setMsgErroAltura] = useState(null);
  const [msgErroPeso, setMsgErroPeso] = useState(null);

  function verificarPreenchimento() {
    peso != null && peso != "" && altura != null && altura != ""
      ? calcularImc()
      : erroPreenchimento();
  }

  function calcularImc() {
    setMsgErroAltura(null);
    setMsgErroPeso(null);
    const a = parseFloat(altura.toString().replace(",", "."));
    const p = parseFloat(peso.toString().replace(",", "."));
    if (isNaN(a) || isNaN(p)) {
      setMsg(msgErroPreenchimento);
      setTextoBotao(textoBtnTentarNovamente);
    } else {
      setImc((p / (a * a)).toFixed(2));
      setMsg(msgResultado);
      setTextoBotao(textoBtnLimparDados);
    }
  }

  function erroPreenchimento() {
    Vibration.vibrate();
    altura == null || altura == ""
      ? setMsgErroAltura(campoObrigatorio)
      : setMsgErroAltura(null);
    peso == null || peso == ""
      ? setMsgErroPeso(campoObrigatorio)
      : setMsgErroPeso(null);
    setImc(null);
    setTextoBotao(textoBtnCalcular);
    setMsg(msgAguardandoDados);
  }

  function limparDados() {
    setAltura(null);
    setPeso(null);
    setImc(null);
    setTextoBotao(textoBtnCalcular);
    setMsg(msgAguardandoDados);
  }

  function acaoClick() {
    textoBotao == textoBtnLimparDados || textoBotao == textoBtnTentarNovamente
      ? limparDados()
      : verificarPreenchimento();
  }

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={setAltura}
          value={altura}
          placeholder={msgErroAltura != null ? msgErroAltura : "Ex.: 1,75"}
          placeholderTextColor={msgErroAltura != null ? "orange" : "lightgrey"}
          maxLength={4}
          keyboardType="numeric"
          editable={textoBotao == "Calcular"}
        />
        <Text style={styles.formLabel}>Peso</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={setPeso}
          value={peso}
          placeholder={msgErroPeso != null ? msgErroPeso : "Ex.: 75,300"}
          placeholderTextColor={msgErroPeso != null ? "orange" : "lightgrey"}
          maxLength={6}
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
