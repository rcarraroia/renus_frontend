import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";

const functionalityData = [
  { name: 'Automação', Frequência: 150, Prioridade: 80 },
  { name: 'Relatórios', Frequência: 120, Prioridade: 65 },
  { name: 'Integração CRM', Frequência: 90, Prioridade: 95 },
  { name: 'Gamificação', Frequência: 70, Prioridade: 40 },
];

const rankingData = [
    { funcionalidade: "Integração CRM", frequencia: 95, prioridade: "Alta" },
    { funcionalidade: "Automação de Follow-up", frequencia: 80, prioridade: "Alta" },
    { funcionalidade: "Relatórios Personalizados", frequencia: 65, prioridade: "Média" },
    { funcionalidade: "Gamificação", frequencia: 40, prioridade: "Baixa" },
];

const FuncionalidadesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Análise de Funcionalidades</h1>

      {/* Bar Chart */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Funcionalidades Mais Citadas</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={functionalityData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Legend />
              <Bar dataKey="Frequência" fill="hsl(var(--primary))" />
              <Bar dataKey="Prioridade" fill="hsl(var(--secondary-foreground))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Word Cloud Placeholder */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Termos Mais Recorrentes (Word Cloud)</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <p className="text-muted-foreground italic">Placeholder para visualização de Word Cloud.</p>
        </CardContent>
      </Card>

      {/* Ranking Table */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Ranking de Funcionalidades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-secondary/50">
                {["Funcionalidade", "Frequência", "Prioridade"].map((header) => (
                  <TableHead key={header} className="text-primary">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((item, index) => (
                <TableRow key={index} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{item.funcionalidade}</TableCell>
                  <TableCell>{item.frequencia}</TableCell>
                  <TableCell>
                    <Badge variant={item.prioridade === 'Alta' ? 'destructive' : item.prioridade === 'Média' ? 'default' : 'secondary'}>
                        {item.prioridade}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuncionalidadesPage;