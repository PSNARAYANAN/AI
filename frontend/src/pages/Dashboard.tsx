import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Camera, Search, Dumbbell, History, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data: log } = useQuery({
    queryKey: ['daily-log'],
    queryFn: async () => {
      const res = await api.get('/food/daily-log');
      return res.data;
    },
  });

  const targetCalories = user?.goal === 'LOSE_WEIGHT' ? 1800 : 2800;
  const streak = 5; // Placeholder for streak logic
  const consumed = log?.caloriesConsumed || 0;

  const weightData = [
    { date: 'Mon', weight: 80.5 },
    { date: 'Tue', weight: 80.2 },
    { date: 'Wed', weight: 80.3 },
    { date: 'Thu', weight: 79.9 },
    { date: 'Fri', weight: 79.8 },
    { date: 'Sat', weight: 79.7 },
    { date: 'Sun', weight: 79.5 },
  ];

  const macroData = [
    { name: 'Protein', value: log?.protein || 0, color: '#ef4444' },
    { name: 'Carbs', value: log?.carbs || 0, color: '#3b82f6' },
    { name: 'Fat', value: log?.fat || 0, color: '#eab308' },
  ];

  const calorieData = [
    { name: 'Consumed', value: consumed },
    { name: 'Remaining', value: Math.max(0, targetCalories - consumed) },
  ];

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Hello, {user?.name || 'User'}</h1>
          <div className="flex gap-2 items-center mt-1">
            <span className="bg-primary/20 text-primary px-2 py-1 rounded text-[10px] font-bold">
              {user?.goal?.replace('_', ' ')}
            </span>
            <span className="bg-orange-500/20 text-orange-500 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
              🔥 {streak} Day Streak
            </span>
          </div>
        </div>
        <button onClick={logout} className="text-secondary hover:text-white">
          <LogOut size={24} />
        </button>
      </header>

      <section className="card mb-6 flex items-center justify-between">
        <div className="w-1/2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={calorieData}
                innerRadius={50}
                outerRadius={65}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#eab308" />
                <Cell fill="#262626" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-24">
            <span className="text-xl font-bold">{consumed}</span>
            <p className="text-[10px] text-secondary">of {targetCalories} kcal</p>
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <h3 className="text-sm font-bold mb-4">Macros (g)</h3>
          {macroData.map((m) => (
            <div key={m.name} className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{m.name}</span>
                <span>{Math.round(m.value)}g</span>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (m.value / 150) * 100)}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link to="/scan-food" className="card flex flex-col items-center gap-2 hover:border-primary">
          <Camera className="text-primary" />
          <span>Scan Food</span>
        </Link>
        <Link to="/scan-label" className="card flex flex-col items-center gap-2 hover:border-primary">
          <Search className="text-primary" />
          <span>Scan Label</span>
        </Link>
        <Link to="/exercises" className="card flex flex-col items-center gap-2 hover:border-primary">
          <Dumbbell className="text-primary" />
          <span>Exercises</span>
        </Link>
        <div className="card flex flex-col items-center gap-2 opacity-50">
          <History className="text-primary" />
          <span>History</span>
        </div>
      </div>

      <h2 className="font-bold mb-4">Weight Progress (kg)</h2>
      <section className="card mb-8 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData}>
            <XAxis dataKey="date" stroke="#a3a3a3" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="#a3a3a3" fontSize={10} axisLine={false} tickLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip contentStyle={{ backgroundColor: '#121212', border: '1px solid #262626' }} />
            <Line type="monotone" dataKey="weight" stroke="#eab308" strokeWidth={2} dot={{ fill: '#eab308' }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <h2 className="font-bold mb-4">Today's Meals</h2>
      <div className="flex flex-col gap-3">
        {log?.meals?.length > 0 ? (
          log.meals.map((meal: any) => (
            <div key={meal.id} className="card flex justify-between items-center py-3">
              <div>
                <p className="font-bold">{meal.name}</p>
                <p className="text-xs text-secondary">{meal.calories} kcal • {meal.protein}g P</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary text-sm text-center py-4">No meals logged today</p>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-neutral-800 p-4 flex justify-around items-center">
        <Link to="/" className="text-primary"><Camera /></Link>
        <Link to="/exercises" className="text-secondary"><Dumbbell /></Link>
        <Link to="/onboarding" className="text-secondary"><Search /></Link>
      </nav>
    </div>
  );
};

export default Dashboard;
