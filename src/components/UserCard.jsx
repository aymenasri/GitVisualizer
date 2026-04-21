import React from 'react';
import { Users, Book, MapPin, Link as LinkIcon } from 'lucide-react';

const UserCard = ({ user }) => {
  // Si on n'a pas encore d'utilisateur (pendant le chargement)
  if (!user) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl text-white max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar avec un cercle dégradé */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
          <img 
            src={user.avatar_url} 
            alt={user.login} 
            className="w-24 h-24 rounded-full border-2 border-slate-900"
          />
        </div>

        {/* Informations utilisateur */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {user.name || user.login}
          </h2>
          <p className="text-blue-400 font-mono mb-2">@{user.login}</p>
          <p className="text-gray-300 leading-relaxed mb-4">
            {user.bio || "Ce développeur préfère garder le mystère sur sa bio... 🚀"}
          </p>

          {/* Stats rapides */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Repos</span>
              <div className="flex items-center gap-1 text-lg font-semibold">
                <Book size={18} className="text-purple-400" />
                {user.public_repos}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Followers</span>
              <div className="flex items-center gap-1 text-lg font-semibold">
                <Users size={18} className="text-blue-400" />
                {user.followers}
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Following</span>
              <div className="flex items-center gap-1 text-lg font-semibold">
                <Users size={18} className="text-green-400" />
                {user.following}
              </div>
            </div>
          </div>

          {/* Liens secondaires */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-gray-400">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                {user.location}
              </div>
            )}
            {user.blog && (
              <a href={user.blog} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <LinkIcon size={14} />
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;