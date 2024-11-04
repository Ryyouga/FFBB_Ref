import axios from 'axios';
import { Referee } from '../types/types';

const API_URL = 'http://localhost:3000/api';

export async function searchReferees(query: string): Promise<Referee[]> {
  const response = await axios.get(`${API_URL}/referees`, {
    params: { search: query }
  });
  return response.data;
}