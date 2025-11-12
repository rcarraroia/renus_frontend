import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Download, Copy, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/clipboard";

// --- Mock Data and Generation Logic ---

interface DocumentParams {
  niche: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  responsible: string;
}

const generateMockYaml = (params: DocumentParams): string => {
  const { niche, responsible } = params;
  const date = format(new Date(), 'yyyy-MM-dd');

  // Mock data based on niche selection
  let summary = "Análise de requisitos gerais.";
  let trends = ["Tendência 1", "Tendência 2"];
  let features = [
    { nome: "Funcionalidade Padrão", prioridade: 5, descricao: "Descrição padrão." }
  ];

  if (niche === 'MMN') {
    summary = "Mapear funcionalidades e requisitos de agentes para distribuidores de MMN.";
    trends = ["Automação de follow-up", "Gestão de metas e bonificações", "Comunicação integrada"];
    features = [
      { nome: "Gestão de metas", prioridade: 1, descricao: "Monitorar performance de distribuidores e calcular bonificações." },
      { nome: "Automação de follow-up", prioridade: 2, descricao: "Agendar e enviar mensagens automáticas de acompanhamento." },
    ];
  } else if (niche === 'Saúde') {
    summary = "Foco em agendamento e conformidade regulatória.";
    trends = ["Integração com prontuários eletrônicos", "Lembretes de consulta"];
    features = [
      { nome: "Agendamento Inteligente", prioridade: 1, descricao: "Otimização de horários de consultas." },
    ];
  }

  const yamlContent = `projeto: RENUS - Pesquisa de Requisitos
data_geracao: ${date}
responsavel: ${responsible || 'Não Informado'}
nicho_analisado: ${niche}
resumo_geral:
  objetivo: "${summary}"
  principais_tendencias:
${trends.map(t => `    - ${t}`).join('\n')}
funcionalidades_prioritarias:
${features.map(f => `  - nome: "${f.nome}"\n    prioridade: ${f.prioridade}\n    descricao: "${f.descricao}"`).join('\n')}
requisitos_tecnicos:
  linguagem_principal: "TypeScript / Python"
  stack_recomendada: "Next.js + FastAPI + Supabase"
  integracoes_previstas:
    - WhatsApp API
    - Google Calendar
etapas_de_desenvolvimento:
  - fase: 1
    descricao: "Design conversacional e fluxos"
  - fase: 2
    descricao: "Prototipagem funcional"
  - fase: 3
    descricao: "Integração com APIs"
  - fase: 4
    descricao: "Testes e implantação"
`;

  return yamlContent;
};

// --- Component ---

const DocumentoTecnicoPage: React.FC = () => {
  const [yamlOutput, setYamlOutput] = useState<string>('projeto: RENUS - Pesquisa de Requisitos\n# Selecione um nicho e clique em "Gerar Documento" para visualizar o conteúdo YAML.');
  const [niche, setNiche] = useState<string>('MMN');
  const [responsible, setResponsible] = useState<string>('Renato Carraro');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined, to: Date | undefined }>({ from: undefined, to: undefined });

  const handleGenerate = useCallback(() => {
    const params: DocumentParams = {
      niche,
      startDate: dateRange.from,
      endDate: dateRange.to,
      responsible,
    };
    const generatedYaml = generateMockYaml(params);
    setYamlOutput(generatedYaml);
  }, [niche, responsible, dateRange]);

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([yamlOutput], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = `documento_tecnico_${niche.toLowerCase()}_${format(new Date(), 'yyyyMMdd')}.yaml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Documento Técnico</h1>

      {/* Form Card */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Gerar Documento Técnico</CardTitle>
          <p className="text-sm text-muted-foreground">Selecione o nicho e gere o documento técnico consolidado da pesquisa.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nicho */}
            <div className="space-y-2">
              <Label htmlFor="nicho">Nicho</Label>
              <Select value={niche} onValueChange={setNiche}>
                <SelectTrigger id="nicho" className="bg-card">
                  <SelectValue placeholder="Selecione o Nicho" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  {["MMN", "Saúde", "Imobiliária", "Profissional Liberal", "Outros"].map(n => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Período (Date Range Picker) */}
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="date-range">Período</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-card",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Selecione o período</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-card" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Responsável */}
            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Input 
                id="responsible" 
                placeholder="Renato Carraro" 
                className="bg-card" 
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              className="bg-primary hover:bg-primary/80 text-primary-foreground"
              onClick={handleGenerate}
            >
              <FileText className="mr-2 h-4 w-4" />
              Gerar Documento
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* YAML Preview Card */}
      <Card className="bg-secondary/30 border-primary/20">
        <CardHeader>
          <CardTitle>Pré-visualização do YAML Gerado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-background p-4 rounded-lg border border-border overflow-x-auto max-h-[500px] font-mono text-sm text-green-400 whitespace-pre-wrap">
            {yamlOutput}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button 
          variant="secondary" 
          className="bg-primary hover:bg-primary/80 text-primary-foreground"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Baixar YAML
        </Button>
        <Button 
          variant="ghost" 
          className="text-primary hover:bg-primary/10"
          onClick={() => copyToClipboard(yamlOutput)}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copiar para Área de Transferência
        </Button>
      </div>
    </div>
  );
};

export default DocumentoTecnicoPage;