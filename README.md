# Rock Scissors Paper

Ett realtidsspel av sten-sax-påse där två spelare kan spela mot varandra online.

## Beskrivning

Projektet är en webbapplikation byggd med Node.js, Express och Socket.io för realtidskommunikation mellan två spelare. Spelresultaten sparas i en MongoDB-databas.

## Teknik

- **Backend:** Express.js
- **Realtid:** Socket.io
- **Databas:** MongoDB + Mongoose
- **Frontend:** HTML, CSS, JavaScript

## Installation

```bash
npm install
```

## Hur man kör det

```bash
node app.js
```

Öppna sedan webbläsaren och gå till `http://localhost:3000`

## Funktionalitet

- Två spelare ansluter och matar in sina namn
- Spelarna väljer samtidigt (sten, sax eller påse)
- Resultatet beräknas och visas för båda spelarna
- Statistik (vinster/förluster) sparas i databasen

## API-endpoints

- `GET /players` - Hämtar alla spelares statistik
- `DELETE /players` - Raderar all spelardata
