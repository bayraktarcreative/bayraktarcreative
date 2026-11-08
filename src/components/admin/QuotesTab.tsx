import React, { useState } from 'react';
import { Quote } from '@/lib/types';
import { CheckCircle2, Clock, Trash2, Phone, Mail, Calendar, MapPin, FileText, ChevronDown } from 'lucide-react';

interface QuotesTabProps {
  quotes: Quote[];
  onRefresh: () => void;
}

export default function QuotesTab({ quotes, onRefresh }: QuotesTabProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateStatus = async (id: string, status: Quote['status']) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Durum güncellenemedi');
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata');
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText }),
      });
      if (!res.ok) throw new Error('Not kaydedilemedi');
      setActiveNotesId(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Hata');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Silinemedi');
      setDeleteConfirmId(null);
      onRefresh();
    } catch (err: any) {
      alert(err.message || 'Silme hatası');
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    if (statusFilter === 'all') return true;
    return q.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold font-display uppercase tracking-wide text-white">
            Gelen Teklif Talepleri
          </h2>
          <p className="text-xs text-white/50 font-mono mt-0.5">
            Toplam {quotes.length} müşteri başvurusu kaydedildi.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'in_progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                statusFilter === st
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-white/60'
              }`}
            >
              {st === 'all'
                ? `Tümü (${quotes.length})`
                : st === 'new'
                ? `Yeni (${quotes.filter((q) => q.status === 'new').length})`
                : st === 'in_progress'
                ? `Görüşülüyor (${quotes.filter((q) => q.status === 'in_progress').length})`
                : `Tamamlandı (${quotes.filter((q) => q.status === 'completed').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Quote Cards List */}
      {filteredQuotes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#121215] border border-white/10 text-white/40 text-xs">
          Bu filtreye uygun teklif talebi bulunmamaktadır.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuotes.map((q) => {
            const formattedDate = new Date(q.createdAt).toLocaleString('tr-TR', {
              dateStyle: 'medium',
              timeStyle: 'short',
            });

            return (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-white">{q.fullName}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/80">
                      {q.serviceType}
                    </span>
                    <span className="text-xs text-white/40 font-mono">• {q.sector}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formattedDate}
                    </span>

                    {/* Status Select */}
                    <select
                      value={q.status}
                      onChange={(e) => updateStatus(q.id, e.target.value as Quote['status'])}
                      className={`px-3 py-1 rounded-full text-xs font-mono border focus:outline-none ${
                        q.status === 'new'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                          : q.status === 'in_progress'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      <option value="new" className="bg-[#121215] text-white">Yeni Başvuru</option>
                      <option value="in_progress" className="bg-[#121215] text-white">Görüşülüyor</option>
                      <option value="completed" className="bg-[#121215] text-white">Tamamlandı</option>
                      <option value="archived" className="bg-[#121215] text-white">Arşivlendi</option>
                    </select>

                    <button
                      onClick={() => setDeleteConfirmId(q.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Başvuruyu Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-white/40" />
                    <a href={`tel:${q.phone}`} className="font-mono hover:text-white">
                      {q.phone}
                    </a>
                  </div>
                  {q.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <a href={`mailto:${q.email}`} className="font-mono hover:text-white">
                        {q.email}
                      </a>
                    </div>
                  )}
                  {q.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      <span>{q.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {q.description && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/80 leading-relaxed font-light">
                    <span className="text-[10px] text-white/40 font-mono block mb-1">
                      Müşteri Açıklaması & Notu:
                    </span>
                    {q.description}
                  </div>
                )}

                {/* Internal Notes */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  {activeNotesId === q.id ? (
                    <div className="w-full flex items-center gap-2">
                      <input
                        type="text"
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Dahili stüdyo notu yazın..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs"
                      />
                      <button
                        onClick={() => saveNotes(q.id)}
                        className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => setActiveNotesId(null)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs"
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/50">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{q.notes ? `Stüdyo Notu: ${q.notes}` : 'Henüz not eklenmedi.'}</span>
                      <button
                        onClick={() => {
                          setActiveNotesId(q.id);
                          setNoteText(q.notes || '');
                        }}
                        className="text-white/80 hover:text-white underline ml-2 text-[11px]"
                      >
                        {q.notes ? 'Düzenle' : 'Not Ekle'}
                      </button>
                    </div>
                  )}

                  {q.targetDate && (
                    <span className="text-[10px] font-mono text-white/40">
                      Hedef Tarih: {q.targetDate}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#141418] border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white font-display">Teklif Başvurusunu Sil</h3>
            <p className="text-xs text-white/60">
              Bu teklif kaydını silmek istediğinize emin misiniz? Yanlışlıkla silinmeyi önlemek için onay gerekmektedir.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs"
              >
                Vazgeç
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-xs"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
