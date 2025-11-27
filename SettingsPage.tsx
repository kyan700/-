import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { getAesKey, encryptData, createIv } from '../../services/crypto';

const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('ar');

  useEffect(() => {
    db.settings.toCollection().first()
      .then(s => {
        if (s) {
          setApiKey(s.apiKey);
          setTheme(s.theme || 'light');
          setLang(s.lang || 'ar');
        }
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Encrypt key before saving
    const iv = createIv();
    const keyObj = await getAesKey('awab-local-key');
    const encrypted = await encryptData(apiKey, keyObj, iv);
    await db.settings.clear();
    await db.settings.add({
      apiKey: encrypted,
      apiKeyIv: Buffer.from(iv).toString('base64'),
      theme, lang
    });
    alert("تم الحفظ بنجاح.");
  };

  const handleExport = async () => {
    const data = await db.export();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'awab-data.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const text = await e.target.files[0].text();
      await db.import(text);
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-lg bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">الإعدادات</h2>
      <label>مفتاح API للذكاء الصناعي:</label>
      <input className="input" type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />
      <label>الوضع:</label>
      <select className="input" value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">فاتح</option>
        <option value="dark">داكن</option>
      </select>
      <div className="flex gap-2 items-center">
        <button type="submit" className="btn btn-primary">حفظ</button>
        <button type="button" onClick={handleExport} className="btn">تصدير البيانات</button>
        <label className="btn">
          استيراد<input type="file" accept=".json" style={{display: 'none'}} onChange={handleImport} />
        </label>
      </div>
    </form>
  );
};
export default SettingsPage;
