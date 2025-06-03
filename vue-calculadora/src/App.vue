<template>
  <div class="calculator">
    <h1>Calculadora VueJS</h1>
    <div class="inputs">
      <input 
        type="number" 
        v-model.number="num1" 
        placeholder="Número 1" 
      />
      <select v-model="operation">
        <option value="+">+</option>
        <option value="-">−</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>
      <input 
        type="number" 
        v-model.number="num2" 
        placeholder="Número 2" 
      />
    </div>
    <div class="result">
      Resultado: <strong>{{ result }}</strong>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const operation = ref('+')

const result = computed(() => {
  switch(operation.value) {
    case '+': return num1.value + num2.value
    case '-': return num1.value - num2.value
    case '*': return num1.value * num2.value
    case '/': return num2.value === 0 ? 'Erro: Divisão por zero' : (num1.value / num2.value)
    default: return 0
  }
})
</script>
