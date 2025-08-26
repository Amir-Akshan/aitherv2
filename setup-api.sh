#!/bin/bash

echo "🔑 Configuração da API Key do Bitquery"
echo "======================================"
echo ""
echo "1. Acesse: https://bitquery.io/"
echo "2. Faça login na sua conta"
echo "3. Vá para 'Access Tokens'"
echo "4. Clique em 'Create New Token'"
echo "5. Copie a API key (formato: BQYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)"
echo ""
read -p "Cole sua API key aqui: " ory_at_4IGGNPu_fhHPt13muF0qcTzv7w93PPrXaWBcA2nOnLw.IjXYe9iRNUDhN-AGKOOq_yskNEoYngVIQTjxG_GNkSs	

if [ -n "$API_KEY" ]; then
    echo "NEXT_PUBLIC_BITQUERY_API_KEY=$API_KEY" > .env.local
    echo "✅ API key configurada com sucesso!"
    echo "🔄 Reiniciando o servidor..."
    echo ""
    echo "Agora você pode:"
    echo "1. Acessar http://localhost:3001/token"
    echo "2. Clicar em 'Testar API'"
    echo "3. Clicar em 'Buscar Token Específico'"
else
    echo "❌ API key não fornecida!"
fi

