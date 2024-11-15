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

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

const SALES_CHANNEL_DATA = [
  { name: 'Website', value: 45600 },
  { name: 'Mobile App', value: 38200 },
  { name: 'Marketplace', value: 29800 },
  { name: 'Social Media', value: 18700 },
];
function SalesChannelChart() {
  return (
    <CardContainer title={'Sales Channel'} isFullWidth={true}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={SALES_CHANNEL_DATA}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
          <XAxis dataKey={'name'} stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              borderColor: '#4b5563',
            }}
            itemStyle={{
              color: '#e5e7eb',
            }}
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
        </BarChart>{' '}
      </ResponsiveContainer>
    </CardContainer>
  );
}

export default SalesChannelChart;
