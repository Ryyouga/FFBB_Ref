import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SearchBar } from './SearchBar';
import { RefereeMatches } from './RefereeMatches';
import { searchReferees } from '../api/referees';

export const RefereeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: referees = [], isLoading, error } = useQuery(
    ['referees', searchTerm],
    () => searchReferees(searchTerm),
    {
      enabled: searchTerm.length >= 2,
      keepPreviousData: true
    }
  );

  return (
    <div className="flex flex-col items-center space-y-8">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Chargement...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">
            Une erreur est survenue lors de la recherche
          </p>
        </div>
      )}

      <div className="w-full space-y-8">
        {referees.map((referee) => (
          <RefereeMatches key={referee.id} referee={referee} />
        ))}
      </div>

      {searchTerm.length >= 2 && !isLoading && referees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun arbitre trouvé pour "{searchTerm}"
          </p>
        </div>
      )}

      {searchTerm.length < 2 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Entrez au moins 2 caractères pour rechercher un arbitre
          </p>
        </div>
      )}
    </div>
  );
};