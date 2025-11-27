import React, { useState, useEffect } from 'react';
import { db, Lecture, Course, FileItem } from '../../services/db';
import { summarizeContent } from '../../services/ai';
import { extractTextFromImage } from '../../services/ocr';

const LecturesPage: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [lectureContent, setLectureContent] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    db.lectures.toArray().then(setLectures);
    db.settings.toCollection().first().then(s => setApiKey(s?.apiKey || ''));
  }, []);

  const handleOcrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setOcrText('...جارٍ المعالجة');
      const text = await extractTextFromImage(e.target.files[0], 'ara+eng');
      setOcrText(text);
      setLectureContent(text);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const result = await summarizeContent(lectureContent, apiKey);
      setSummary(result);
    } catch {
      setSummary('حدث خطأ أثناء تلخيص النص.');
    }
    setIsSummarizing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📝 المحاضرات</h2>
      <div className="mb-4">
        <label className="block mb-1">رفع ملف صورة (OCR)</label>
        <input type="file" accept="image/*" onChange={handleOcrUpload} />
        {ocrText && <div className="bg-gray-50 border p-2 mt-2 rounded">{ocrText}</div>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">محتوى المحاضرة</label>
        <textarea className="w-full h-32 border rounded p-2" value={lectureContent} onChange={e => setLectureContent(e.target.value)} />
      </div>
      <button className="btn btn-primary mb-2" disabled={isSummarizing} onClick={handleSummarize}>
        {isSummarizing ? "يتم التلخيص ..." : "تلخيص تلقائي"}
      </button>
      {summary && (<div className="p-2 bg-yellow-50 border rounded my-2">{summary}</div>)}
      <div>
        <h3 className="font-semibold mt-6 mb-2">جميع المحاضرات:</h3>
        <ul className="space-y-2">
          {lectures.map(l => <li key={l.id} className="p-2 border rounded">{l.title}</li>)}
        </ul>
      </div>
    </div>
  );
};
export default LecturesPage;
