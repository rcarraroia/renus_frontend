import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText } from "lucide-react";

const mockRespostas = [
  { id: 101, leadId: 1, pergunta: "Qual seu maior desafio?", resposta: "Gerenciar o tempo.", nicho: "MMN", data: "2024-10-01" },
  { id: 102, leadId: 2, pergunta: "O que você mais valoriza?", resposta: "Suporte técnico rápido.", nicho: "Saúde", data: "2024-10-02" },
  { id: 103, leadId: 3, pergunta: "Qual funcionalidade falta?", resposta: "Integração com CRM.", nicho: "Imobiliária", data: "2024-10-03" },
];

const RespostasPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Respostas Coletadas</h1>

      {/* Filter Bar */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardContent className="pt-6 flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Nicho:</label>
            <Select>
              <SelectTrigger className="w-[180px] bg-card">
                <SelectValue placeholder="Selecione o Nicho" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="mmn">MMN</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-muted-foreground">Palavra-chave:</label>
            <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-8 bg-card" />
            </div>
          </div>
          <Button variant="secondary" className="ml-auto bg-primary hover:bg-primary/80 text-primary-foreground">
            <FileText className="mr-2 h-4 w-4" />
            Exportar Tudo
          </Button>
        </CardContent>
      </Card>

      {/* Responses Table */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Respostas Coletadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-secondary/50">
                {["ID Lead", "Pergunta", "Resposta", "Nicho", "Data"].map((header) => (
                  <TableHead key={header} className="text-primary">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRespostas.map((resp) => (
                <TableRow key={resp.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{resp.leadId}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{resp.pergunta}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{resp.resposta}</TableCell>
                  <TableCell>{resp.nicho}</TableCell>
                  <TableCell>{resp.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RespostasPage;