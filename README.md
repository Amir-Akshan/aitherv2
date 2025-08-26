# PyxisLabs Website

## Configuração da API Token

Para que a página Token funcione corretamente com dados reais, você precisa configurar a API key do Bitquery:

1. Acesse [Bitquery.io](https://bitquery.io/) e crie uma conta
2. Gere uma API key gratuita
3. Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_BITQUERY_API_KEY=sua_api_key_aqui
```

4. Substitua `YOUR_TOKEN_ADDRESS_HERE` no arquivo `src/components/token/TokenData.tsx` pelo endereço do contrato do token que você deseja monitorar.

## APIs Utilizadas

- **Pump.fun API**: Para dados de tokens e preços em tempo real
- **GMGN API**: Para dados históricos e gráficos
- **Solana Token Search API**: Para busca de tokens

Documentação das APIs:
- [Pump.fun API](https://docs.bitquery.io/docs/examples/Solana/Pump-Fun-API/)
- [GMGN API](https://docs.bitquery.io/docs/examples/Solana/solana-gmgn-api/)
- [Solana Token Search API](https://docs.bitquery.io/docs/examples/Solana/solana-search-tokens/)
