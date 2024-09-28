"use client";

import { useState, useEffect } from "react";
import { getDocuments } from "../lib/firebase/firebaseUtils";

interface Note {
  id: string;
  text: string;
  timestamp: string;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getDocuments("notes");
      setNotes(fetchedNotes as Note[]);
    };

    fetchNotes();
  }, []);

  return (
    <div className="w-full max-w-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">
          No notes yet. Start recording to create your first note!
        </p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-600">
                {new Date(note.timestamp).toLocaleString()}
              </p>
              <p className="mt-2">{note.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
