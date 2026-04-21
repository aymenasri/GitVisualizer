import { useState } from 'react';
import { getUserData, getUserRepos } from './services/githubApi';
import UserCard from './components/UserCard';
import LangChart from './components/LangChart';
import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]); // Nouveau state pour les repos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async (username) => {
    setLoading(true);
    setError(null);
    try {
      // On lance les deux requêtes en même temps pour que ce soit plus rapide
      const [userResponse, reposResponse] = await Promise.all([
        getUserData(username),
        getUserRepos(username)
      ]);
      
      setUser(userResponse.data);
      setRepos(reposResponse.data); // On sauvegarde les repos dans le state
    } catch (err) {
      setError("Utilisateur non trouvé... Vérifie le pseudo !");
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-10">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">GitVisualizer</h1>
        <SearchBar onSearch={fetchUser} />
      </header>

      <main className="max-w-4xl mx-auto">
        {loading && <p className="text-center animate-pulse">Chargement des données...</p>}
        {error && <p className="text-center text-red-400 bg-red-400/10 p-4 rounded-lg">{error}</p>}
        
        {user && !loading && (
          <div className="flex flex-col gap-6">
            <UserCard user={user} />
            <LangChart repos={repos} />
          </div>
        )}
        
        {!user && !loading && !error && (
          <div className="text-center text-gray-500 mt-20">
            <p>Recherchez un profil pour voir la magie opérer ✨</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;