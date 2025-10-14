'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { recentTransactions } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

export function FinancialMetrics() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Mock financial data
  const debtMetrics = {
    totalDebt: 1500000000,
    ltvRatio: 38.5, // Loan-to-value ratio
    interestCoverage: 3.2,
    avgInterestRate: 7.8,
    debtMaturitySchedule: [
      { year: '2025', amount: 200000000 },
      { year: '2026', amount: 350000000 },
      { year: '2027', amount: 450000000 },
      { year: '2028', amount: 300000000 },
      { year: '2029+', amount: 200000000 },
    ],
  };

  const dividendMetrics = {
    currentDistribution: 185000000,
    payoutRatio: 82,
    forecasted: 195000000,
    growthRate: 5.4,
  };

  const budgetVsActual = [
    { 
      property: 'Sandton City Office Tower', 
      budgetedIncome: 42000000, 
      actualIncome: 43500000,
      budgetedExpenses: 18000000,
      actualExpenses: 17200000,
      variance: 2300000,
    },
    { 
      property: 'Gateway Theatre of Shopping', 
      budgetedIncome: 156000000, 
      actualIncome: 158200000,
      budgetedExpenses: 68000000,
      actualExpenses: 69500000,
      variance: 700000,
    },
    { 
      property: 'Waterfall Logistics Park', 
      budgetedIncome: 28800000, 
      actualIncome: 28800000,
      budgetedExpenses: 12500000,
      actualExpenses: 11800000,
      variance: 700000,
    },
    { 
      property: 'Century City Office Park', 
      budgetedIncome: 25200000, 
      actualIncome: 24100000,
      budgetedExpenses: 11000000,
      actualExpenses: 11500000,
      variance: -1600000,
    },
  ];

  const leaseExpiry = [
    { property: 'Century City Office Park', tenant: 'Media24 Holdings', expiry: '2026-05-31', risk: 'Medium' },
    { property: 'Gateway Theatre of Shopping', tenant: 'Multiple Retail Tenants', expiry: '2026-12-31', risk: 'Low' },
    { property: 'Sandton City Office Tower', tenant: 'Multiple Corporate Tenants', expiry: '2027-06-30', risk: 'Low' },
    { property: 'East Rand Industrial Hub', tenant: 'DHL Supply Chain', expiry: '2028-02-28', risk: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="budget" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="budget">Budget vs Actual</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="debt">Debt & Capital</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>

        {/* Budget vs Actual */}
        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Budget Variance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">
                  {formatCurrency(budgetVsActual.reduce((sum, p) => sum + p.variance, 0))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Positive variance indicates outperformance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Properties On Track</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{budgetVsActual.filter(p => p.variance >= 0).length}/{budgetVsActual.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Meeting or exceeding budget</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Avg Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">+2.8%</div>
                <p className="text-xs text-muted-foreground mt-1">Above budgeted targets</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget vs Actual Performance by Property</CardTitle>
              <CardDescription>Year-to-date comparison for forecasting next year</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead className="text-right">Budgeted Income</TableHead>
                    <TableHead className="text-right">Actual Income</TableHead>
                    <TableHead className="text-right">Budgeted Expenses</TableHead>
                    <TableHead className="text-right">Actual Expenses</TableHead>
                    <TableHead className="text-right">Variance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetVsActual.map((item) => (
                    <TableRow key={item.property}>
                      <TableCell>{item.property}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.budgetedIncome)}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.actualIncome >= item.budgetedIncome ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(item.actualIncome)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatCurrency(item.budgetedExpenses)}</TableCell>
                      <TableCell className="text-right">
                        <span className={item.actualExpenses <= item.budgetedExpenses ? 'text-green-600' : 'text-red-600'}>
                          {formatCurrency(item.actualExpenses)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.variance >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={item.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(item.variance)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions & P&L</CardTitle>
              <CardDescription>Profit and loss from acquisitions and disposals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead className="text-right">Transaction Value</TableHead>
                    <TableHead className="text-right">Profit/Loss</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString('en-ZA')}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'Acquisition' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.propertyName}</TableCell>
                      <TableCell className="text-right">{formatCurrency(transaction.value)}</TableCell>
                      <TableCell className="text-right">
                        {transaction.profitLoss !== undefined ? (
                          <div className="flex items-center justify-end gap-2">
                            {transaction.profitLoss >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={transaction.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {formatCurrency(transaction.profitLoss)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debt & Capital */}
        <TabsContent value="debt" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{formatCurrency(debtMetrics.totalDebt)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">LTV Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{debtMetrics.ltvRatio}%</div>
                <p className="text-xs text-green-600 mt-1">Healthy range (target {'<'}40%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Interest Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{debtMetrics.interestCoverage}x</div>
                <p className="text-xs text-green-600 mt-1">Strong coverage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Avg Interest Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{debtMetrics.avgInterestRate}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Debt Maturity Schedule</CardTitle>
              <CardDescription>Refinancing timeline and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {debtMetrics.debtMaturitySchedule.map((item) => {
                  const percentage = (item.amount / debtMetrics.totalDebt) * 100;
                  return (
                    <div key={item.year} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>{item.year}</span>
                        <div className="flex items-center gap-4">
                          {percentage > 30 && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                          <span className="text-sm text-muted-foreground">{formatCurrency(item.amount)}</span>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dividend Distributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Distribution</p>
                    <p className="text-2xl">{formatCurrency(dividendMetrics.currentDistribution)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payout Ratio</p>
                    <div className="flex items-center gap-3">
                      <Progress value={dividendMetrics.payoutRatio} className="flex-1" />
                      <span>{dividendMetrics.payoutRatio}%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Forecasted Distribution</p>
                    <p className="text-2xl text-green-600">{formatCurrency(dividendMetrics.forecasted)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xl text-green-600">{dividendMetrics.growthRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecasts */}
        <TabsContent value="forecasts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lease Expiry Schedule & Rollover Risk</CardTitle>
              <CardDescription>Upcoming lease renewals requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaseExpiry.map((lease, index) => (
                    <TableRow key={index}>
                      <TableCell>{lease.property}</TableCell>
                      <TableCell>{lease.tenant}</TableCell>
                      <TableCell>{new Date(lease.expiry).toLocaleDateString('en-ZA')}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={lease.risk === 'Low' ? 'outline' : lease.risk === 'Medium' ? 'secondary' : 'destructive'}
                        >
                          {lease.risk}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Development Pipeline Value Creation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Investment</p>
                  <p className="text-2xl">{formatCurrency(420000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Projected Value</p>
                  <p className="text-2xl text-green-600">{formatCurrency(520000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Value Creation</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-xl text-green-600">{formatCurrency(100000000)} (23.8%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capital Expenditure Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Required CapEx (Next 12 months)</p>
                  <p className="text-2xl">{formatCurrency(125000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Available Capital</p>
                  <p className="text-2xl text-green-600">{formatCurrency(200000000)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Capital Adequacy</p>
                  <Progress value={62.5} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">62.5% utilization - healthy buffer</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vacancy Forecasts by Sector/Node</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Office Sector</h4>
                    <Badge variant="outline">Gauteng</Badge>
                  </div>
                  <p className="text-2xl mb-1">7.2%</p>
                  <p className="text-xs text-muted-foreground">Forecasted vacancy rate</p>
                  <p className="text-xs text-green-600 mt-2">↓ 1.5% from current</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Retail Sector</h4>
                    <Badge variant="outline">National</Badge>
                  </div>
                  <p className="text-2xl mb-1">3.8%</p>
                  <p className="text-xs text-muted-foreground">Forecasted vacancy rate</p>
                  <p className="text-xs text-green-600 mt-2">↓ 0.8% from current</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Industrial Sector</h4>
                    <Badge variant="outline">East Rand</Badge>
                  </div>
                  <p className="text-2xl mb-1">12.5%</p>
                  <p className="text-xs text-muted-foreground">Forecasted vacancy rate</p>
                  <p className="text-xs text-red-600 mt-2">↑ 4.5% from current</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
