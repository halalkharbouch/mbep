import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

import CardContainer from '../common/CardContainer';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899'];

const SALES_CHANNEL_DATA = [
  { name: 'Development', value: 26828090 },
  { name: 'Recovery', value: 6348765 },
  { name: 'Humanitarian', value: 1120000 },
];

function FundsByDonorCategory({ donorFundCategoryCounts }) {
  return (
    <CardContainer title={'Charts of Fund by Donor Category'}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={donorFundCategoryCounts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
          <XAxis dataKey={'name'} stroke="#9ca3af" />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              borderColor: '#4b5563',
            }}
            itemStyle={{
              color: '#e5e7eb',
            }}
            formatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Legend />
          <Bar dataKey={'value'} fill="#8884d8">
            {SALES_CHANNEL_DATA.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

export default FundsByDonorCategory;
