# Requisito Normalizado

## Identificação

- Fonte original: `docs/requisitos/00-originais/p1-java.txt`
- Contexto de negócio: gestão de frota da TransRota Nien
- Estado do documento: rascunho inicial normalizado

## Contexto

A TransRota Nien expandiu sua operação de transporte de um contexto local para uma frota com cerca de 20 veículos, incluindo vans urbanas e carretas para a região Sudeste. O controle atual ainda depende de planilha compartilhada, quadro branco e memória operacional do proprietário.

Esse modelo não sustenta mais a operação. O setor comercial fecha contratos sem confirmar a disponibilidade real dos veículos, e a empresa já sofreu prejuízo por enviar veículo com vistoria vencida.

## Problemas Observados

### Disponibilidade

- Não existe visão confiável dos veículos livres, em rota ou em manutenção.
- A alocação pode ocorrer sobre veículos indisponíveis.

Impacto:

- perda de contratos
- atrasos nas entregas

### Manutenção e segurança

- A manutenção ocorre de forma reativa.
- Não há registro confiável sobre trocas de óleo, pneus, revisão de freios e itens obrigatórios.
- Vistorias e itens de segurança podem vencer sem acompanhamento.

Impacto:

- veículo parado em estrada
- risco operacional
- multas e apreensões

### Capacidade de carga

- Não há cadastro centralizado com peso máximo e volume por veículo.
- Há risco de subutilização de carretas ou sobrecarga de vans.

Impacto:

- frete ineficiente
- multas
- desgaste prematuro do veículo

### Ciclo de vida do ativo

- Entrada, venda, baixa ou perda total de veículos não é atualizada com agilidade.
- Veículos que não pertencem mais à frota podem continuar aparecendo no planejamento.

Impacto:

- inventário inconsistente
- retrabalho administrativo

## Necessidade Declarada

O sistema deve oferecer uma visão única da frota para apoiar decisões operacionais e comerciais, garantindo que cada veículo listado esteja em condição segura, legal e operacional para uso.

## Requisitos Extraídos do Texto

1. O sistema deve permitir consultar a disponibilidade atual dos veículos.
2. O sistema deve permitir alterar rapidamente o status de um veículo para manutenção.
3. Um veículo em manutenção deve ficar bloqueado para novas rotas.
4. O sistema deve manter informações de manutenção e segurança dos veículos.
5. O sistema deve manter dados de capacidade, incluindo peso máximo e volume.
6. O sistema deve permitir desativar ou excluir veículo vendido, preservando histórico quando necessário.
7. A interface deve ser simples, com linguagem acessível e operação adequada para usuários pouco habituados a tecnologia.
8. O sistema deve ser utilizável além do escritório, incluindo oficina e pátio.

## Restrições e Observações

- O documento não define perfis de acesso formalmente.
- O documento não define fluxo detalhado de venda de serviços.
- O documento não define modelo de dados.
- O documento não define integrações externas.
- O documento não define se "exclusão" significa remoção lógica, remoção física ou desativação.

## Objetivo de Negócio

Ao final do dia, a operação deve conseguir confiar que cada placa exibida no sistema representa um ativo apto a gerar receita, com manutenção em dia e capacidade respeitada.
