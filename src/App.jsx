import { useState, useEffect } from "react";

export default function App() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState("");

  useEffect(() => {
    if (altura && peso) {
      const alturaM = parseFloat(altura) / 100;
      const pesoKg = parseFloat(peso);
      if (alturaM > 0 && pesoKg > 0) {
        const imcCalculado = pesoKg / (alturaM * alturaM);
        setImc(imcCalculado.toFixed(2));
        setClassificacao(classificarIMC(imcCalculado));
      } else {
        setImc(null);
        setClassificacao("");
      }
    } else {
      setImc(null);
      setClassificacao("");
    }
  }, [altura, peso]);

  function classificarIMC(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 24.9) return "Peso normal";
    if (imc < 29.9) return "Sobrepeso";
    if (imc < 34.9) return "Obesidade grau 1";
    if (imc < 39.9) return "Obesidade grau 2";
    return "Obesidade grau 3";
  }

  function resetar() {
    setAltura("");
    setPeso("");
    setImc(null);
    setClassificacao("");
  }

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // evita reload ao apertar Enter
        }}
      >
        <label>
          Altura (cm):
          <input
            type="number"
            min="0"
            step="0.1"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Ex: 170"
            required
          />
        </label>
        <label>
          Peso (kg):
          <input
            type="number"
            min="0"
            step="0.1"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Ex: 70"
            required
          />
        </label>
        <div className="botoes">
          <button type="button" onClick={resetar} className="btn-reset">
            Resetar
          </button>
        </div>
      </form>

      {imc && (
        <div className="resultado">
          <p>
            Seu IMC: <strong>{imc}</strong>
          </p>
          <p>
            Classificação: <strong>{classificacao}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
