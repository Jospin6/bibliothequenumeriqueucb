// components/BooksPerSubjectChart.tsx

'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface Props {
  data: {
    subject: string;
    bookCount: number;
  }[];
}

const BooksPerSubjectChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-96 p-4 bg-transparent rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📚 Livres par matière</h2>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="subject"
            angle={-20}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            label={{ value: 'Nombre de livres', angle: -90, position: 'insideLeft', offset: 10 }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="bookCount" name="Livres" fill="#6366f1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BooksPerSubjectChart;
