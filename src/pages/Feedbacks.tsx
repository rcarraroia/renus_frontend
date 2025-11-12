import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Send } from "lucide-react";

const mockFeedbacks = [
  { id: 1, nicho: "MMN", mensagem: "O bot está muito lento...", canal: "E-mail", status: "Pendente", data: "2024-09-28" },
  { id: 2, nicho: "Saúde", mensagem: "Sugestão de novo prompt.", canal: "WhatsApp", status: "Resolvido", data: "2024-09-29" },
];

const FeedbacksPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Gestão de Feedbacks</h1>

      {/* Feedback Table */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Feedbacks Enviados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-secondary/50">
                {["Nicho", "Mensagem", "Canal", "Status", "Data"].map((header) => (
                  <TableHead key={header} className="text-primary">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedbacks.map((feedback) => (
                <TableRow key={feedback.id} className="hover:bg-secondary/50">
                  <TableCell className="font-medium">{feedback.nicho}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{feedback.mensagem}</TableCell>
                  <TableCell>{feedback.canal}</TableCell>
                  <TableCell>
                    <Badge variant={feedback.status === 'Pendente' ? 'destructive' : 'default'}>
                        {feedback.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{feedback.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create New Feedback Form */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Criar Novo Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nicho */}
            <div className="space-y-2">
              <Label htmlFor="nicho">Nicho</Label>
              <Select>
                <SelectTrigger id="nicho" className="bg-card">
                  <SelectValue placeholder="Selecione o Nicho" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {["MMN", "Saúde", "Imobiliária", "Profissional Liberal"].map(n => (
                    <SelectItem key={n} value={n.toLowerCase()}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Agendar Envio (DateTime) */}
            <div className="space-y-2">
              <Label htmlFor="schedule">Agendar Envio</Label>
              <Input id="schedule" type="datetime-local" className="bg-card" />
            </div>
          </div>

          {/* Mensagem */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" placeholder="Descreva o feedback..." className="bg-card min-h-[100px]" />
          </div>

          {/* Canal (Radio) */}
          <div className="space-y-2">
            <Label>Canal</Label>
            <RadioGroup defaultValue="email" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="r1" />
                <Label htmlFor="r1">E-mail</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="r2" />
                <Label htmlFor="r2">WhatsApp</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Salvar Rascunho
            </Button>
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
                <Send className="mr-2 h-4 w-4" />
                Enviar Feedback
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbacksPage;