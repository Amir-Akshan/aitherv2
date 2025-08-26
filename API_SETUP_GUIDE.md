# 🔑 Guia de Configuração da API Key do Bitquery

## ❌ Problema Atual
A API key atual (`cxsivBkxfbic9LlMIhJR29fOVK`) não está no formato correto e está causando erro de padrão.

## ✅ Solução Passo a Passo

### **1. Acesse o Bitquery Dashboard**
1. Vá para [https://bitquery.io/](https://bitquery.io/)
2. Faça login na sua conta (gimbutis23@gmail.com)
3. Vá para **"Access Tokens"** no menu lateral

### **2. Crie uma Nova API Key**
1. Clique em **"Create New Token"** ou **"Generate Token"**
2. Configure o token:
   - **Name**: `AitherDex Token Analytics`
   - **Description**: `API key para análise de tokens da Pump.fun`
   - **Permissions**: 
     - ✅ Solana
     - ✅ DEX Trades
     - ✅ Token Supply Updates

### **3. Copie a API Key**
A API key deve ter um formato como:
```
BQYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **4. Configure no Projeto**

#### **Opção A: Usando o Script Automático**
```bash
./setup-api.sh
```

#### **Opção B: Configuração Manual**
1. Crie/edite o arquivo `.env.local` na raiz do projeto
2. Adicione sua API key:
```env
NEXT_PUBLIC_BITQUERY_API_KEY=sua_api_key_aqui
```

### **5. Teste a Configuração**
1. Reinicie o servidor (se necessário)
2. Acesse `http://localhost:3001/token`
3. Clique em **"Testar API"**
4. Verifique se aparece "API funcionando!"

## 🔍 Verificação da API Key

### **Formato Correto**
- ✅ Deve começar com `BQY`
- ✅ Deve ter aproximadamente 64 caracteres
- ✅ Deve conter apenas letras e números

### **Formato Incorreto**
- ❌ `cxsivBkxfbic9LlMIhJR29fOVK` (muito curto)
- ❌ `aither` (não é uma API key)
- ❌ `5ab80016-be82-4dd6-981c-673c00261575` (é um ID)

## 🚀 Após Configurar

### **1. Teste a API**
- Clique em **"Testar API"** na página
- Verifique o console do navegador (F12)

### **2. Busque o Token Específico**
- Clique em **"Buscar Token Específico"**
- O token `Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump` será buscado

### **3. Pesquise Outros Tokens**
- Use o campo de pesquisa com lupa
- Digite qualquer endereço de token Solana

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique se a API key está correta
2. Confirme se tem permissões para Solana
3. Verifique o console do navegador para erros detalhados
4. Entre em contato com o suporte do Bitquery



