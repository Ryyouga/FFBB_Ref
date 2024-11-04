import { Referee } from '../types/types';

export const mockReferees: Referee[] = [
  {
    id: '1',
    name: 'Thomas Dupont',
    matches: [
      {
        id: 'm1',
        date: '2024-03-15',
        homeTeam: 'Paris Basketball',
        awayTeam: 'Lyon ASVEL',
        location: 'Halle Carpentier',
        competition: 'Pro A'
      },
      {
        id: 'm2',
        date: '2024-03-08',
        homeTeam: 'Nanterre 92',
        awayTeam: 'Monaco',
        location: 'Palais des Sports',
        competition: 'Pro A'
      }
    ]
  },
  {
    id: '2',
    name: 'Sophie Martin',
    matches: [
      {
        id: 'm3',
        date: '2024-03-14',
        homeTeam: 'Strasbourg',
        awayTeam: 'Dijon',
        location: 'Rhenus Sport',
        competition: 'Pro A'
      }
    ]
  }
];