import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import CardContainer from '../common/CardContainer';

const categoryData = [
  { name: 'Electronics', value: 4500 },
  { name: 'Clothing', value: 3200 },
  { name: 'Home & Garden', value: 2800 },
  { name: 'Books', value: 2100 },
  { name: 'Sports & Outdoors', value: 1900 },
];

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

function CategoryDistributionChart() {
  return (
    <CardContainer title="Category Distribution">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </CardContainer>
  );
}

export default CategoryDistributionChart;
