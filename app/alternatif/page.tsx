'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import PageHeader from '@/components/ui/PageHeader';
import { Table, Th, Td } from '@/components/ui/Table';
import { Plus, Pencil, Trash2, Package, Coffee } from 'lucide-react';

interface Alt { id: string; name: string; brand: string; values: Record<string, number>; }

export default function Alternatif() {
  const supabase = createClient();
  const [data, setData] = useState<Alt[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Alt | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    const { data: c } = await supabase.from('criteria').select('*');
    setCriteria(c || []);
    const { data: alts } = await supabase.from('alternatives').select('*');
    const { data: vals } = await supabase.from('alternative_values').select('*');
    const mapped = (alts || []).map(a => ({ ...a, values: (vals || []).filter(v => v.alternative_id === a.id).reduce((acc, v) => ({ ...acc, [v.criteria_id]: v.value }), {}) }));
    setData(mapped);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get('name'), brand: form.get('brand') };

    let targetId = edit?.id;
    if (edit) {
      await supabase.from('alternatives').update(payload).eq('id', edit.id);
    } else {
      const { data: newAlt } = await supabase.from('alternatives').insert(payload).select().single();
      targetId = newAlt?.id;
    }

    if (targetId) {
      await supabase.from('alternative_values').delete().eq('alternative_id', targetId);
      const vals = criteria.map(c => ({ alternative_id: targetId, criteria_id: c.id, value: Number(form.get(`val_${c.id}`)) }));
      await supabase.from('alternative_values').insert(vals);
    }

    setSaving(false); setOpen(false); setEdit(null); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('alternatives').delete().eq('id', id);
    fetchData();
  };

  const colCount = 4 + criteria.length;

  return (
    <div className="space-y-7">
      <PageHeader
        icon={Package}
        eyebrow="Data"
        title="Data Alternatif"
        subtitle={`${data.length} saset kopi terdaftar`}
        action={
          <Button onClick={() => { setEdit(null); setOpen(true); }}>
            <Plus className="h-4 w-4" />Tambah Alternatif
          </Button>
        }
      />

      <Table>
        <thead>
          <tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Brand</Th>
            {criteria.map(c => <Th key={c.id}>{c.name}</Th>)}
            <Th className="text-right">Aksi</Th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                <Td colSpan={colCount}>
                  <div className="shimmer h-5 w-full rounded-md" />
                </Td>
              </tr>
            ))
          )}
          {!loading && data.map((a, i) => (
            <tr key={a.id}>
              <Td className="font-medium text-muted">{i + 1}</Td>
              <Td className="font-medium text-ink">
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Coffee className="h-3.5 w-3.5" />
                  </span>
                  {a.name}
                </span>
              </Td>
              <Td><Badge tone="neutral">{a.brand}</Badge></Td>
              {criteria.map(c => <Td key={c.id} className="tabular-nums">{a.values[c.id] ?? '-'}</Td>)}
              <Td>
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => { setEdit(a); setOpen(true); }} aria-label="Edit" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent/10 hover:text-accent-dark"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(a.id)} aria-label="Hapus" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-error/10 hover:text-error"><Trash2 className="h-4 w-4" /></button>
                </div>
              </Td>
            </tr>
          ))}
          {!loading && data.length === 0 && (
            <tr>
              <Td colSpan={colCount} className="py-12 text-center">
                <Package className="mx-auto mb-3 h-10 w-10 text-border" />
                <p className="text-sm font-medium text-ink">Belum ada alternatif</p>
                <p className="text-xs text-muted">Klik &quot;Tambah Alternatif&quot; untuk menambahkan kopi.</p>
              </Td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? 'Edit Alternatif' : 'Tambah Alternatif'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Nama Kopi</label>
              <input name="name" defaultValue={edit?.name} placeholder="cth. Kapal Api Special" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40" required />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Brand</label>
              <input name="brand" defaultValue={edit?.brand} placeholder="cth. Kapal Api" className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40" required />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {criteria.map(c => (
              <div key={c.id}>
                <label className="mb-1 block text-xs font-medium text-muted">{c.name}</label>
                <input name={`val_${c.id}`} type="number" step="any" defaultValue={edit?.values[c.id] ?? ''} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40" required />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Menyimpan…' : 'Simpan'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
