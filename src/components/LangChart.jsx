import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#c084fc', '#f43f5e', '#10b981', '#f59e0b', '#6366f1']; // De jolies couleurs Tailwind

const LangChart = ({ repos }) => {
  // Si on n'a pas de repos, on n'affiche rien
  if (!repos || repos.length === 0) return null;

  // --- ÉTAPE A : Compter les apparitions de chaque langage ---
  const langCount = {};
  repos.forEach(repo => {
    const lang = repo.language;
    if (lang) { // Si le repo a un langage (parfois c'est null)
      if (langCount[lang]) {
        langCount[lang] += 1; // Le langage existe déjà, on ajoute 1
      } else {
        langCount[lang] = 1;  // C'est la première fois qu'on le voit, on le met à 1
      }
    }
  });
  // À ce stade, langCount ressemble à ça : { "JavaScript": 3, "Python": 1, "Java": 1 }

  // --- ÉTAPE B : Transformer en format Recharts ---
  // On utilise Object.keys pour transformer l'objet en un tableau d'objets
  const data = Object.keys(langCount).map((lang) => {
    return {
      name: lang,
      value: langCount[lang]
    };
  });
  // À ce stade, data devient : [{ name: 'JavaScript', value: 3 }, { name: 'Python', value: 1 }...]

  // --- ÉTAPE C : Trier les données du plus grand au plus petit ---
  data.sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl text-white mt-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Langages Principaux
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value" // Ce qu'on utilise pour la taille de la part
              nameKey="name"  // Ce qu'on utilise pour le nom
              cx="50%"        // Centre X
              cy="50%"        // Centre Y
              innerRadius={60} // Rayon intérieur pour faire un donut (style moderne)
              outerRadius={80} // Rayon extérieur
              paddingAngle={5} // Espace entre les parts
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`} // Texte affiché à côté
            >
              {/* On attribue une couleur à chaque part du camembert */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* Tooltip c'est l'infobulle quand on passe la souris dessus */}
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.75rem', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LangChart;