import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Match } from '../types/types';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{match.competition}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(match.date)}</span>
          </div>
          <div className="flex items-center mt-1 text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{match.location}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {match.score}
          </span>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <p className="font-medium text-gray-900">{match.homeTeam}</p>
            <p className="text-sm text-gray-500">Domicile</p>
          </div>
          <div className="text-center px-4">
            <span className="text-xl font-bold text-gray-400">VS</span>
          </div>
          <div className="text-center flex-1">
            <p className="font-medium text-gray-900">{match.awayTeam}</p>
            <p className="text-sm text-gray-500">Extérieur</p>
          </div>
        </div>
      </div>
    </div>
  );
}