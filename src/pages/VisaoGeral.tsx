import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { DollarSign, Users, CheckCircle, Zap } from "lucide-react";

// Mock Data
const statsData = [
  { label: "Interações", value: "1.248", icon: Zap, color: "text-primary" },
  { label: "Leads", value: "642", icon: Users, color: "text-green-400" },
  { label: "Taxa de Conclusão", value: "82%", icon: CheckCircle, color: "text-yellow-400" },
  { label: "Nichos Ativos", value: "5", icon: DollarSign, color: "text-red-400" },
];

const activityData = [
  { name: 'Seg', value: 400 },
  { name: 'Ter', value: 300 },
  { name: 'Qua', value: 200 },
  { name: 'Qui', value: 278 },
  { name: 'Sex', value: 189 },
  { name: 'Sáb', value: 239 },
  { name: 'Dom', value: 349 },
];

const nicheData = [
  { name: 'MMN', value: 400, color: '#00d8ff' },
  { name: 'Saúde', value: 300, color: '#8884d8' },
  { name: 'Imobiliária', value: 300, color: '#82ca9d' },
  { name: 'Prof. Liberal', value: 200, color: '#ffc658' },
  { name: 'Outros', value: 100, color: '#ff7300' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const VisaoGeralPage = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Visão Geral do RENUS</h1>
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item) => (
          <Card key={item.label} className="border-primary/20 hover:border-primary transition-colors duration-300 bg-secondary/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-secondary/30 border-primary/20">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30 border-primary/20">
          <CardHeader>
            <CardTitle>Distribuição por Nicho</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nicheData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nicheData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--primary))' }}
                />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ paddingLeft: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default VisaoGeralPage;