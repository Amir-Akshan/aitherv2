#!/bin/bash

echo "🔑 Configuração da API Key do Bitquery"
echo "======================================"
echo ""
echo "📚 Baseado na documentação oficial:"
echo "   https://docs.bitquery.io/docs/intro/"
echo ""
echo "📋 Passos para obter a API key:"
echo "1. Acesse: https://docs.bitquery.io/docs/intro/"
echo "2. Clique em 'Get Your Access Token' no topo da página"
echo "3. Ou navegue para a seção 'Authorisation'"
echo "4. Siga as instruções para gerar sua API key"
echo ""
echo "🔍 A API key deve ter um formato específico do Bitquery"
echo "   (não o formato 'ory_at_' que você estava recebendo)"
echo ""

read -p "Cole sua API key do Bitquery aqui: " API_KEY

if [ -n "$API_KEY" ]; then
    # Verificar se não é um token Ory
    if [[ $API_KEY == ory_at_* ]]; then
        echo "❌ ERRO: Esta é uma API key do Ory, não do Bitquery!"
        echo "   Você precisa obter a API key correta do Bitquery"
        echo "   Siga as instruções na documentação oficial"
        echo ""
        echo "💡 Dica: A API key do Bitquery deve ter formato diferente"
    else
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
    fi
else
    echo "❌ API key não fornecida!"
    echo ""
    echo "💡 Instruções:"
    echo "1. Acesse a documentação oficial do Bitquery"
    echo "2. Procure por 'Get Your Access Token'"
    echo "3. Gere uma nova API key"
    echo "4. Execute este script novamente"
fi

