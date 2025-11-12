import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List, TrendingUp } from "lucide-react";

const trends = [
    "Automação de follow-up",
    "Gestão de metas",
    "Gamificação",
    "Integração com redes sociais",
];

const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Insights e Recomendações</h1>

      {/* Summary */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Resumo Automático das Pesquisas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            A análise das últimas 1000 interações indica uma forte demanda por ferramentas de automação de processos internos (75% das menções). O nicho de MMN demonstrou maior insatisfação com a falta de integração com plataformas de gestão de leads existentes.
          </p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Recomendações do RENUS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <p className="text-sm text-foreground">
              Priorizar o desenvolvimento da funcionalidade de integração com CRM/ERP para o nicho MMN. Sugere-se também a criação de um módulo de gamificação para aumentar o engajamento dos agentes, conforme tendência observada.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trends List */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader className="flex flex-row items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Tendências Identificadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {trends.map((trend, index) => (
              <li key={index} className="flex items-center text-foreground/80">
                <List className="h-4 w-4 mr-3 text-primary/70 flex-shrink-0" />
                {trend}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPage;