'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Table, Th, Td } from '@/components/ui/Table';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Alt { id: string; name: string; brand: string; values: Record<string, number>; }

export default function Alternatif() {
  const supabase = createClient();
  const [data, setData] = useState<Alt[]>([]);
  const [criteria, setCriteria] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Alt | null>(null);

  const fetchData = async () => {
    const { data: c } = await supabase.from('criteria').select('*');
    setCriteria(c || []);
    const { data: alts } = await supabase.from('alternatives').select('*');
    const { data: vals } = await supabase.from('alternative_values').select('*');
    const mapped = (alts || []).map(a => ({ ...a, values: (vals || []).filter(v => v.alternative_id === a.id).reduce((acc, v) => ({ ...acc, [v.criteria_id]: v.value }), {}) }));
    setData(mapped);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = { name: form.get('name'), brand: form.get('brand') };
    
    let targetId = edit?.id;
    if (edit) {
      await supabase.from('alternatives').update(payload).eq('id', edit.id);
    } else {
      const { data: newAlt } = await supabase.from('alternatives').insert(payload).select().single();
      targetId = newAlt.id;
    }

    if (targetId) {
      await supabase.from('alternative_values').delete().eq('alternative_id', targetId);
      const vals = criteria.map(c => ({ alternative_id: targetId, criteria_id: c.id, value: form.get(`val_${c.id}`) }));
      await supabase.from('alternative_values').insert(vals);
    }

    setOpen(false); setEdit(null); fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from('alternatives').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-neutral-100">Data Alternatif</h2>
        <Button onClick={() => { setEdit(null); setOpen(true); }}><Plus className="w-4 h-4 mr-2 inline" />Tambah</Button>
      </div>
      <Card>
        <Table>
          <thead><tr><Th>No</Th><Th>Nama</Th><Th>Brand</Th>{criteria.map(c => <Th key={c.id}>{c.name}</Th>)}<Th>Aksi</Th></tr></thead>
          <tbody>
            {data.map((a, i) => (
              <tr key={a.id}>
                <Td>{i + 1}</Td><Td>{a.name}</Td><Td>{a.brand}</Td>
                {criteria.map(c => <Td key={c.id}>{a.values[c.id] || '-'}</Td>)}
                <Td>
                  <button onClick={() => { setEdit(a); setOpen(true); }} className="text-accent hover:text-accent-light mr-3"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? 'Edit Alternatif' : 'Tambah Alternatif'}>
        <form onSubmit={handleSave} className="space-y-4">
          <input name="name" defaultValue={edit?.name} placeholder="Nama Kopi" className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm" required />
          <input name="brand" defaultValue={edit?.brand} placeholder="Brand" className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm" required />
          {criteria.map(c => (
            <div key={c.id}>
              <label className="text-xs text-neutral-400">{c.name}</label>
              <input name={`val_${c.id}`} type="number" step="any" defaultValue={edit?.values[c.id] || ''} className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm mt-1" required />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}