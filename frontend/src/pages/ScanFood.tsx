import { useState, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const ScanFood = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleScan = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await api.post('/food/scan-food', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to scan food');
    } finally {
      setLoading(false);
    }
  };

  const handleLog = async () => {
    try {
      await api.post('/food/log-meal', {
        name: result.name,
        calories: result.calories,
        protein: result.proteinG,
        carbs: result.carbsG,
        fat: result.fatG,
        fiber: result.fiberG,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to log meal');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">Scan Your Meal</h1>

      <div
        className="card border-dashed border-2 flex flex-col items-center justify-center h-64 mb-6 cursor-pointer overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <Camera size={48} className="text-secondary mb-2" />
            <p className="text-secondary">Take a photo or upload</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {image && !result && (
        <button
          onClick={handleScan}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Scan Food'}
        </button>
      )}

      {result && (
        <div className="card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold mb-4">{result.name}</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-900 p-3 rounded-lg text-center">
              <p className="text-[10px] text-secondary uppercase">Calories</p>
              <p className="text-lg font-bold text-primary">{result.calories}</p>
            </div>
            <div className="bg-neutral-900 p-3 rounded-lg text-center">
              <p className="text-[10px] text-secondary uppercase">Protein</p>
              <p className="text-lg font-bold text-red-500">{result.proteinG}g</p>
            </div>
            <div className="bg-neutral-900 p-3 rounded-lg text-center">
              <p className="text-[10px] text-secondary uppercase">Carbs</p>
              <p className="text-lg font-bold text-blue-500">{result.carbsG}g</p>
            </div>
            <div className="bg-neutral-900 p-3 rounded-lg text-center">
              <p className="text-[10px] text-secondary uppercase">Fat</p>
              <p className="text-lg font-bold text-yellow-500">{result.fatG}g</p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6">
            <p className="text-sm font-bold text-primary mb-1">AI Advice:</p>
            <p className="text-sm">{result.fitsGoalAdvice}</p>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setResult(null)} className="btn-secondary flex-1">Retake</button>
            <button onClick={handleLog} className="btn-primary flex-1">Log Meal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanFood;
