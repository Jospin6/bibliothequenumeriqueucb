// components/ViewsPerFacultyBarChart.tsx

'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Props {
  data: {
    faculty: string;
    viewCount: number;
  }[];
}

const ViewsPerFacultyBarChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-96 p-4 bg-transparent rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📊 Vues des livres par faculté</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="faculty" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="viewCount" fill="#6366F1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewsPerFacultyBarChart;
