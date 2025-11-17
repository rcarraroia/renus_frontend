import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useFuncionalidades } from "@/hooks/useFuncionalidades";

const FuncionalidadesPage: React.FC = () => {
  const { data: funcionalidades, isLoading, error } = useFuncionalidades();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Carregando funcionalidades...</span>
      </div>
    );
  }

  if (error || !funcionalidades) {
    return (
      <div className="text-center py-8 text-destructive">
        Erro ao carregar funcionalidades. Tente novamente.
      </div>
    );
  }

  // Transform data for chart
  const functionalityData = funcionalidades.map(f => ({
    name: f.nome,
    Frequência: f.votos,
    Prioridade: f.prioridade === 'Alta' ? 95 : f.prioridade === 'Média' ? 65 : 40
  }));
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
                {["Funcionalidade", "Votos", "Prioridade", "Nicho"].map((header) => (
                  <TableHead key={header} className="text-primary">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {funcionalidades.map((item) => (
                <TableRow key={item.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell>{item.votos}</TableCell>
                  <TableCell>
                    <Badge variant={item.prioridade === 'Alta' ? 'destructive' : item.prioridade === 'Média' ? 'default' : 'secondary'}>
                        {item.prioridade}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.nicho}</TableCell>
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