# 🔑 Configuração Final da API Key do Bitquery

## ✅ Baseado na Documentação Oficial
Este guia é baseado na [documentação oficial do Bitquery](https://docs.bitquery.io/docs/authorisation/how-to-generate/).

## 📋 Passos para Obter a API Key

### **1. Criar uma Aplicação**
1. Acesse o Bitquery Dashboard
2. Vá para a página **"Applications"**
3. Clique em **"Create application"**
4. Configure:
   - **Name**: `AitherDex Token Analytics`
   - **Expiration time**: Selecione um tempo adequado
5. Clique em **"Create"**

### **2. Gerar Access Token**
1. Vá para a página **"Access Token"**
2. Selecione a aplicação que você criou
3. Clique em **"Generate Access Token"**
4. **Copie o access token** e armazene em local seguro

### **3. Formato do Token**
O token gerado deve ter um formato como:
```
ory_at_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Nota**: Mesmo começando com `ory_at_`, este é o formato correto do Bitquery para tokens de acesso.

## 🔧 Configuração no Projeto

### **1. Atualizar .env.local**
```env
NEXT_PUBLIC_BITQUERY_API_KEY=seu_token_aqui
```

### **2. Formato de Autenticação**
O projeto foi atualizado para usar:
```
Authorization: Bearer <access_token>
```

## 🧪 Teste da API

### **1. Reiniciar o Servidor**
```bash
npm run dev
```

### **2. Testar na Interface**
1. Acesse `http://localhost:3000/token`
2. Clique em **"Testar API"**
3. Verifique se aparece "API funcionando!"

### **3. Buscar Token Específico**
1. Clique em **"Buscar Token Específico"**
2. O token `Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump` será buscado

## 🚨 Solução de Problemas

### **Erro 401 - Unauthorized**
- Verifique se o token está correto
- Confirme se o token não expirou
- Verifique se a aplicação está ativa

### **Erro de Conexão**
- Verifique a conexão com a internet
- Confirme se o endpoint está acessível

### **Token Inválido**
- Gere um novo token
- Verifique se copiou o token completo
- Confirme se não há espaços extras

## 📊 Funcionalidades Disponíveis

### **Token Data**
- Preços em tempo real
- Market cap
- Volume 24h
- Liquidez
- Informações do criador

### **Token Chart**
- Gráfico de preços
- Dados históricos
- Volume de negociação
- Múltiplos timeframes

## 🎯 Próximos Passos

1. **Obtenha o token** seguindo os passos acima
2. **Configure no .env.local**
3. **Teste a API**
4. **Busque tokens específicos**
5. **Explore as funcionalidades**

## 📞 Suporte

Se ainda tiver problemas:
- [Documentação Oficial](https://docs.bitquery.io/docs/authorisation/how-to-generate/)
- [Telegram](https://t.me/bitquery) - Para dúvidas rápidas
- [Community Forum](https://community.bitquery.io/) - Para perguntas da comunidade
- [Support Desk](https://bitquery.io/support) - Para problemas de dados

