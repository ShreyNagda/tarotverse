import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { html } = req.body;

  console.log(html);

  if (!html) {
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const fullHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              padding: 20px;
            }
            img {
              max-width: 100%;
            }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=result.pdf');
    res.end(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
