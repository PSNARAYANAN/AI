import { useState, useRef } from 'react';
import { Search, Loader2, Info } from 'lucide-react';
import api from '../utils/api';

const ScanLabel = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const res = await api.post('/food/scan-label', formData);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to scan label');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 81) return 'text-green-500';
    if (score >= 66) return 'text-yellow-500';
    if (score >= 41) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-2xl font-bold mb-6">Scan Label</h1>

      <div
        className="card border-dashed border-2 flex flex-col items-center justify-center h-64 mb-6 cursor-pointer overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <Search size={48} className="text-secondary mb-2" />
            <p className="text-secondary">Scan a nutrition label</p>
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
          {loading ? <Loader2 className="animate-spin" /> : 'Analyze Label'}
        </button>
      )}

      {result && (
        <div className="card animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col items-center mb-6">
            <div className={`relative w-32 h-32 flex items-center justify-center rounded-full border-8 ${getScoreColor(result.score).replace('text', 'border')}`}>
              <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
            </div>
            <p className="mt-2 font-bold uppercase tracking-widest text-secondary">Health Score</p>
          </div>

          <h2 className="text-xl font-bold mb-4">{result.name}</h2>

          <div className="flex flex-col gap-2 mb-6">
            {result.advice.map((item: string, i: number) => (
              <div key={i} className="flex gap-2 text-sm">
                <Info size={16} className="text-primary shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <button onClick={() => setResult(null)} className="btn-secondary w-full">Scan Another</button>
        </div>
      )}
    </div>
  );
};

export default ScanLabel;
