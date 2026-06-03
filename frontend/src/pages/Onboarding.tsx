import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const onboardingSchema = z.object({
  name: z.string().min(2),
  goal: z.enum(['LOSE_WEIGHT', 'GAIN_WEIGHT']),
  currentWeight: z.number().min(30),
  targetWeight: z.number().min(30),
  height: z.number().min(100),
  age: z.number().min(10),
  gender: z.string(),
  activityLevel: z.enum(['SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE']),
});

type OnboardingData = z.infer<typeof onboardingSchema>;

const Onboarding = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
  });
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const onSubmit = async (data: OnboardingData) => {
    try {
      await api.post('/auth/onboarding', data);
      await checkAuth();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Tell us about yourself</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card flex flex-col gap-6">
        <div>
          <label className="block mb-2">Name</label>
          <input {...register('name')} className="input w-full" />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Current Weight (kg)</label>
            <input type="number" {...register('currentWeight', { valueAsNumber: true })} className="input w-full" />
            {errors.currentWeight && <span className="text-red-500 text-sm">{errors.currentWeight.message}</span>}
          </div>
          <div>
            <label className="block mb-2">Target Weight (kg)</label>
            <input type="number" {...register('targetWeight', { valueAsNumber: true })} className="input w-full" />
            {errors.targetWeight && <span className="text-red-500 text-sm">{errors.targetWeight.message}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-2">Height (cm)</label>
            <input type="number" {...register('height', { valueAsNumber: true })} className="input w-full" />
          </div>
          <div>
            <label className="block mb-2">Age</label>
            <input type="number" {...register('age', { valueAsNumber: true })} className="input w-full" />
          </div>
          <div>
            <label className="block mb-2">Gender</label>
            <select {...register('gender')} className="input w-full">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">Goal</label>
          <div className="flex gap-4">
            <label className="flex-1 border p-4 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" value="LOSE_WEIGHT" {...register('goal')} className="mr-2" />
              Lose Weight
            </label>
            <label className="flex-1 border p-4 rounded-lg cursor-pointer hover:border-primary transition-colors">
              <input type="radio" value="GAIN_WEIGHT" {...register('goal')} className="mr-2" />
              Gain Muscle
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2">Activity Level</label>
          <select {...register('activityLevel')} className="input w-full">
            <option value="SEDENTARY">Sedentary</option>
            <option value="LIGHTLY_ACTIVE">Lightly Active</option>
            <option value="MODERATELY_ACTIVE">Moderately Active</option>
            <option value="VERY_ACTIVE">Very Active</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full mt-4">Save and Continue</button>
      </form>
    </div>
  );
};

export default Onboarding;
