// components/BooksPerFacultyPieChart.tsx

'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Props {
  data: {
    faculty: string;
    bookCount: number;
  }[];
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#F43F5E'];

const BooksPerFacultyPieChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-96 p-4 bg-transparent rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📊 Répartition des livres par faculté</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="bookCount"
            nameKey="faculty"
            cx="50%"
            cy="50%"
            outerRadius={110}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BooksPerFacultyPieChart;