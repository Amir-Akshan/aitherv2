#!/bin/bash

echo "🔑 Configuração da API Key do Bitquery"
echo "======================================"
echo ""
echo "⚠️  IMPORTANTE: Esta deve ser uma API key do Bitquery, não do Ory!"
echo ""
echo "📋 Passos para obter a API key:"
echo "1. Acesse: https://bitquery.io/"
echo "2. Faça login com: gimbutis23@gmail.com"
echo "3. Vá para 'Access Tokens' no menu lateral"
echo "4. Clique em 'Create New Token'"
echo "5. Configure:"
echo "   - Name: AitherDex Token Analytics"
echo "   - Permissions: Solana, DEX Trades"
echo "6. Copie a API key (formato: BQYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)"
echo ""
echo "🔍 A API key deve começar com 'BQY', não 'ory_at_'"
echo ""

read -p "Cole sua API key do Bitquery aqui: " API_KEY

if [ -n "$API_KEY" ]; then
    # Verificar se começa com BQY
    if [[ $API_KEY == BQY* ]]; then
        echo "NEXT_PUBLIC_BITQUERY_API_KEY=$API_KEY" > .env.local
        echo "✅ API key configurada com sucesso!"
        echo "🔄 Reiniciando o servidor..."
        echo ""
        echo "🎯 Agora você pode:"
        echo "1. Acessar http://localhost:3000/token"
        echo "2. Clicar em 'Testar API'"
        echo "3. Clicar em 'Buscar Token Específico'"
        echo ""
        echo "📊 A API key será testada automaticamente!"
    else
        echo "❌ ERRO: Esta não parece ser uma API key do Bitquery!"
        echo "   A API key deve começar com 'BQY'"
        echo "   Você forneceu: ${API_KEY:0:10}..."
        echo ""
        echo "💡 Dica: Certifique-se de que está copiando a API key do Bitquery, não do Ory"
    fi
else
    echo "❌ API key não fornecida!"
fi

