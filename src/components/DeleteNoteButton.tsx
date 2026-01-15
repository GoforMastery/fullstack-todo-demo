'use client';

import { deleteNote } from '@/actions/notes';
import { Button } from './ui/button';

export function DeleteNoteButton({ noteId }: { noteId: string }) {
  const handleDelete = async () => {
    await deleteNote(noteId);
  };

  return (
    <Button variant="destructive" size="default" onClick={handleDelete}>
      Delete
    </Button>
  );
}
