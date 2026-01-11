import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { PlusCircle, Trash2, User } from "lucide-react";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/tasks").then((res) => setNotes(res.data));
    api.get("/user/profile").then((res) => setProfile(res.data));
  }, []);

  const addNote = async () => {
    if (!title.trim()) return;
    const res = await api.post("/tasks", { title });
    setNotes([res.data, ...notes]);
    setTitle("");
  };

  const deleteNote = async (id) => {
    await api.delete(`/tasks/${id}`);
    setNotes(notes.filter((n) => n._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white">
      <Navbar />

      <div className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* Profile Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                          rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <User className="text-cyan-400" />
              <h2 className="text-lg font-semibold">Profile</h2>
            </div>

            {profile ? (
              <div className="text-sm space-y-2 text-gray-300">
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  {profile.name}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  {profile.email}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Loading profile...</p>
            )}
          </div>

          {/* Create Note */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 
                          rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Create Trade Note
            </h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="BTC breakout at 42k"
              className="w-full mb-4 px-4 py-3 rounded-lg 
                         bg-black/40 border border-white/10 
                         outline-none focus:border-cyan-400 transition"
            />

            <button
              onClick={addNote}
              className="w-full flex items-center justify-center gap-2 
                         py-2.5 rounded-lg bg-gradient-to-r 
                         from-violet-500 to-cyan-400 
                         font-medium hover:opacity-90 transition"
            >
              <PlusCircle size={16} />
              Add Note
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN – NOTES */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl 
                        border border-white/10 rounded-xl 
                        p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            My Trade Notes
          </h2>

          {notes.length === 0 ? (
            <p className="text-sm text-gray-400">
              No trade notes yet. Add your first idea 🚀
            </p>
          ) : (
            <ul className="space-y-3">
              {notes.map((note) => (
                <li
                  key={note._id}
                  className="flex items-center justify-between 
                             px-4 py-3 rounded-lg 
                             bg-black/40 border border-white/10 
                             hover:border-cyan-400 transition"
                >
                  <span>{note.title}</span>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="text-gray-400 hover:text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
