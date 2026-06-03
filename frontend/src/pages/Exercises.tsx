import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import { Search, X } from 'lucide-react';

const muscleGroups = ['CHEST', 'BACK', 'SHOULDERS', 'ARMS', 'CORE', 'LEGS', 'FULL_BODY'];

const Exercises = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const { data: exercises, isLoading } = useQuery({
    queryKey: ['exercises', selectedGroup, searchTerm],
    queryFn: async () => {
      const res = await api.get('/exercises', {
        params: { muscleGroup: selectedGroup, search: searchTerm }
      });
      return res.data;
    },
  });

  const handleSave = async (id: string) => {
    try {
      await api.post('/exercises/save', { exerciseId: id });
      alert('Saved to your workout!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Exercise Library</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-secondary" size={20} />
        <input
          className="input w-full pl-10"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex overflow-x-auto gap-2 mb-6 no-scrollbar">
        <button
          onClick={() => setSelectedGroup(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${!selectedGroup ? 'bg-primary text-black' : 'bg-surface border border-neutral-800'}`}
        >
          All
        </button>
        {muscleGroups.map(group => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${selectedGroup === group ? 'bg-primary text-black' : 'bg-surface border border-neutral-800'}`}
          >
            {group.replace('_', ' ')}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading exercises...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {exercises?.map((ex: any) => (
            <div key={ex.id} className="card flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{ex.name}</h3>
                  <p className="text-xs text-secondary">{ex.targetMuscle} • {ex.equipment}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded font-bold ${
                  ex.difficulty === 'BEGINNER' ? 'bg-green-900/50 text-green-400' :
                  ex.difficulty === 'INTERMEDIATE' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {ex.difficulty}
                </span>
              </div>
              <button
                onClick={() => setSelectedExercise(ex)}
                className="btn-secondary text-sm"
              >
                View Exercise
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-surface w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute right-4 top-4 text-secondary hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-primary mb-2">{selectedExercise.name}</h2>
            <div className="flex gap-2 mb-6">
              <span className="bg-neutral-800 px-2 py-1 rounded text-xs">{selectedExercise.equipment}</span>
              <span className="bg-neutral-800 px-2 py-1 rounded text-xs">{selectedExercise.difficulty}</span>
            </div>

            <h3 className="font-bold mb-2">Instructions</h3>
            <ol className="list-decimal list-inside text-sm text-secondary flex flex-col gap-2 mb-6">
              {JSON.parse(selectedExercise.instructions).map((step: string, i: number) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-neutral-900 p-3 rounded-lg">
                <p className="text-[10px] text-secondary uppercase">Recommended Sets</p>
                <p className="font-bold">{selectedExercise.setsRecommendation}</p>
              </div>
              <div className="bg-neutral-900 p-3 rounded-lg">
                <p className="text-[10px] text-secondary uppercase">Recommended Reps</p>
                <p className="font-bold">{selectedExercise.repsRecommendation}</p>
              </div>
            </div>

            <h3 className="font-bold mb-2 text-red-400">Common Mistakes</h3>
            <ul className="list-disc list-inside text-sm text-secondary mb-6">
              {JSON.parse(selectedExercise.commonMistakes).map((mistake: string, i: number) => (
                <li key={i}>{mistake}</li>
              ))}
            </ul>

            <button
              onClick={() => handleSave(selectedExercise.id)}
              className="btn-primary w-full"
            >
              Save to My Workout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
