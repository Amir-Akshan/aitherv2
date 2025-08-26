# 🔑 Como Obter a API Key Correta do Bitquery

## ❌ Problema Identificado
A API key atual (`ory_at_4IGGNPu_fhHPt13muF0qcTzv7w93PPrXaWBcA2nOnLw.IjXYe9iRNUDhN-AGKOOq_yskNEoYngVIQTjxG_GNkSs`) **NÃO é do Bitquery** - é do serviço Ory.

## ✅ Solução Passo a Passo

### **Passo 1: Acesse o Bitquery**
1. Abra [https://bitquery.io/](https://bitquery.io/)
2. Clique em **"Sign In"** ou **"Login"**
3. Use suas credenciais: `gimbutis23@gmail.com`

### **Passo 2: Navegue para Access Tokens**
1. No menu lateral esquerdo, procure por **"Access Tokens"**
2. Clique em **"Access Tokens"**

### **Passo 3: Crie um Novo Token**
1. Clique no botão **"Create New Token"** ou **"Generate Token"**
2. Preencha os campos:
   - **Token Name**: `AitherDex Token Analytics`
   - **Description**: `API key para análise de tokens da Pump.fun`
   - **Permissions**: Selecione:
     - ✅ Solana
     - ✅ DEX Trades
     - ✅ Token Supply Updates

### **Passo 4: Copie a API Key**
A API key gerada deve ter este formato:
```
BQYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Exemplo de API key válida:**
```
BQY1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

### **Passo 5: Configure no Projeto**
1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua a linha atual por:
```env
NEXT_PUBLIC_BITQUERY_API_KEY=sua_api_key_aqui
```

### **Passo 6: Teste**
1. Reinicie o servidor (Ctrl+C e `npm run dev`)
2. Acesse `http://localhost:3000/token`
3. Clique em **"Testar API"**

## 🔍 Diferenças Entre API Keys

### **❌ API Key Incorreta (Ory)**
```
ory_at_4IGGNPu_fhHPt13muF0qcTzv7w93PPrXaWBcA2nOnLw.IjXYe9iRNUDhN-AGKOOq_yskNEoYngVIQTjxG_GNkSs
```
- Começa com `ory_at_`
- É do serviço Ory (autenticação)
- Não funciona com Bitquery

### **✅ API Key Correta (Bitquery)**
```
BQYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Começa com `BQY`
- É do serviço Bitquery
- Funciona com nossa aplicação

## 🚨 Erros Comuns

### **Erro 401 - Unauthorized**
- API key incorreta ou expirada
- Permissões insuficientes
- Conta sem créditos

### **Erro de Padrão**
- API key no formato errado
- Caracteres especiais inválidos

## 📞 Suporte

Se ainda tiver problemas:
1. Verifique se está logado na conta correta
2. Confirme se tem permissões para Solana
3. Verifique se a conta tem créditos disponíveis
4. Entre em contato com o suporte do Bitquery

## 🎯 Próximos Passos

Após obter a API key correta:
1. Configure no `.env.local`
2. Reinicie o servidor
3. Teste a API
4. Busque o token específico: `Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump`

