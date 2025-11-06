import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
} from "lucide-react";

export default function DashboardPage() {
  // Dados mockados para exemplo
  const metrics = [
    {
      title: "Saldo Total",
      value: "R$ 45.231,89",
      icon: Wallet,
      trend: {
        value: "+20.1% em relação ao mês passado",
        isPositive: true,
      },
    },
    {
      title: "Receitas do Mês",
      value: "R$ 12.234,00",
      icon: TrendingUp,
      trend: {
        value: "+12.5% em relação ao mês passado",
        isPositive: true,
      },
    },
    {
      title: "Despesas do Mês",
      value: "R$ 8.456,00",
      icon: TrendingDown,
      trend: {
        value: "-4.3% em relação ao mês passado",
        isPositive: true,
      },
    },
    {
      title: "Transações Pendentes",
      value: "23",
      icon: CreditCard,
      description: "5 receitas e 18 despesas",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      descricao: "Salário - Empresa XYZ",
      valor: 8500.0,
      tipo: "receita",
      data: "2024-11-01",
      categoria: "Salário",
    },
    {
      id: 2,
      descricao: "Aluguel Escritório",
      valor: -2500.0,
      tipo: "despesa",
      data: "2024-11-02",
      categoria: "Aluguel",
    },
    {
      id: 3,
      descricao: "Venda de Produto",
      valor: 1200.0,
      tipo: "receita",
      data: "2024-11-03",
      categoria: "Vendas",
    },
    {
      id: 4,
      descricao: "Fornecedor ABC",
      valor: -850.0,
      tipo: "despesa",
      data: "2024-11-04",
      categoria: "Fornecedores",
    },
    {
      id: 5,
      descricao: "Consultoria Cliente",
      valor: 3500.0,
      tipo: "receita",
      data: "2024-11-05",
      categoria: "Serviços",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {/* Cards de Métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tabela de Transações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.descricao}
                  </TableCell>
                  <TableCell>{transaction.categoria}</TableCell>
                  <TableCell>
                    {new Date(transaction.data).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      transaction.tipo === "receita"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.tipo === "receita" ? "+" : ""}
                    {transaction.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
