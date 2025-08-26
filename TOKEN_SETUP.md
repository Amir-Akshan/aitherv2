# Configuração do Token Personalizado

## Passos para Configurar

### 1. Obter API Key do Bitquery

1. Acesse [Bitquery.io](https://bitquery.io/)
2. Crie uma conta gratuita
3. Vá para "API Keys" no dashboard
4. Gere uma nova API key
5. Copie a API key

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_BITQUERY_API_KEY=sua_api_key_aqui
```

### 3. Configurar Token Personalizado

Edite o arquivo `src/components/token/TokenData.tsx` e substitua:

```typescript
const CUSTOM_TOKEN_ADDRESS = "Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump";
```

Pelo endereço do contrato do seu token:

```typescript
const CUSTOM_TOKEN_ADDRESS = "Axdr6x6FWiTGKkFN3moWyQ18qR4U9o4z3568EAnppump"; // Exemplo: BONK
```

### 4. Reiniciar o Servidor

```bash
npm run dev
```

## APIs Utilizadas

### Pump.fun API
- **Dados**: Preços em tempo real, market cap, volume
- **Endpoint**: GraphQL via Bitquery
- **Documentação**: [Pump.fun API](https://docs.bitquery.io/docs/examples/Solana/Pump-Fun-API/)

### GMGN API  
- **Dados**: Histórico de preços, gráficos OHLC
- **Endpoint**: GraphQL via Bitquery
- **Documentação**: [GMGN API](https://docs.bitquery.io/docs/examples/Solana/solana-gmgn-api/)

### Solana Token Search API
- **Dados**: Metadados de tokens, supply, criador
- **Endpoint**: GraphQL via Bitquery
- **Documentação**: [Solana Token Search API](https://docs.bitquery.io/docs/examples/Solana/solana-search-tokens/)

## Funcionalidades Implementadas

### Divisão Menor (Token Data)
- ✅ Texto "AitherDex" adicionado
- ✅ Campo de pesquisa removido
- ✅ Lista filtrada para 2 tokens: Custom + SOL
- ✅ Dados reais via Pump.fun API
- ✅ Informações detalhadas do token

### Divisão Maior (Price Chart)
- ✅ Gráficos com dados reais via GMGN API
- ✅ Timeframes funcionais
- ✅ Dados históricos de preços
- ✅ Gráfico de volume

## Exemplo de Token Popular

Para testar, você pode usar o endereço do BONK:
```
DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
```

## Troubleshooting

### Erro de API Key
- Verifique se a API key está correta
- Confirme se o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor após adicionar a API key

### Token não encontrado
- Verifique se o endereço do token está correto
- Confirme se o token existe na blockchain Solana
- Verifique se há dados de trading para o token

### Dados não carregando
- Verifique a conexão com a internet
- Confirme se a API key tem permissões suficientes
- Verifique o console do navegador para erros



