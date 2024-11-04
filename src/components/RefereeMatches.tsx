import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Referee } from '../types/types';

interface RefereeMatchesProps {
  referee: Referee;
}

export const RefereeMatches: React.FC<RefereeMatchesProps> = ({ referee }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{referee.name}</h2>
      <div className="space-y-4">
        {referee.matches.map((match) => (
          <div key={match.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(match.date).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="text-lg font-medium text-gray-900">
              {match.homeTeam} vs {match.awayTeam}
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4 mr-2" />
              {match.location} - {match.competition}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};