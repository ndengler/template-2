import VoiceRecorder from '@/components/VoiceRecorder';
import NotesList from '@/components/NotesList';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <VoiceRecorder />
      <NotesList />
    </main>
  );
}
