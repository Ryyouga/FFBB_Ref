import puppeteer from 'puppeteer';
import { Referee } from './models/referee.js';

const FFBB_BASE_URL = 'https://resultats.ffbb.com/';
const FFBB_SEARCH_URL = 'https://resultats.ffbb.com/recherche/arbitre.html';

export async function scrapeFFBBData() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(FFBB_SEARCH_URL);

    // Attendre que la page soit chargée
    await page.waitForSelector('form');

    // Récupérer tous les arbitres disponibles
    const referees = [];
    const regions = await page.$$eval('select[name="region"] option', options => 
      options.map(opt => ({ value: opt.value, text: opt.textContent }))
    );

    for (const region of regions) {
      if (!region.value) continue; // Ignorer l'option vide

      console.log(`Scraping region: ${region.text}`);
      
      // Sélectionner la région
      await page.select('select[name="region"]', region.value);
      await page.waitForTimeout(1000); // Attendre le chargement

      // Cliquer sur le bouton de recherche
      await page.click('input[type="submit"]');
      await page.waitForTimeout(2000);

      // Extraire les arbitres de la page
      const regionReferees = await page.evaluate(() => {
        const rows = document.querySelectorAll('table tr');
        const refs = [];
        
        for (let i = 1; i < rows.length; i++) { // Skip header row
          const cells = rows[i].querySelectorAll('td');
          if (cells.length >= 2) {
            const name = cells[1].textContent?.trim();
            const matchLink = cells[1].querySelector('a')?.href;
            
            if (name && matchLink) {
              refs.push({ name, matchLink });
            }
          }
        }
        
        return refs;
      });

      // Pour chaque arbitre, récupérer ses matchs
      for (const referee of regionReferees) {
        console.log(`Scraping matches for: ${referee.name}`);
        
        await page.goto(referee.matchLink);
        await page.waitForTimeout(1000);

        const matches = await page.evaluate(() => {
          const matchRows = document.querySelectorAll('table tr');
          const matchList = [];

          for (let i = 1; i < matchRows.length; i++) {
            const cells = matchRows[i].querySelectorAll('td');
            if (cells.length >= 6) {
              matchList.push({
                date: cells[0].textContent?.trim() || '',
                competition: cells[1].textContent?.trim() || '',
                homeTeam: cells[2].textContent?.trim() || '',
                awayTeam: cells[3].textContent?.trim() || '',
                score: cells[4].textContent?.trim() || '',
                location: cells[5].textContent?.trim() || ''
              });
            }
          }

          return matchList;
        });

        // Sauvegarder dans MongoDB
        await Referee.findOneAndUpdate(
          { name: referee.name },
          { 
            $set: { 
              matches,
              lastUpdated: new Date()
            }
          },
          { upsert: true }
        );

        referees.push({ name: referee.name, matches });
      }
    }

    return referees;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}