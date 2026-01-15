'use client';
import { updateNote } from '@/actions/notes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
export function UpdateNoteButton(props: { noteId: string }) {
  async function handleUpdate() {
    const newTitle = prompt('Enter new title');
    const newContent = prompt('Enter new content');
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>;

    if (newTitle !== null && newContent !== null) {
      await updateNote(props.noteId, newTitle, newContent);
    }
  }

  return (
    <Button onClick={handleUpdate} variant="default" size="default">
      Update
    </Button>
  );
}
