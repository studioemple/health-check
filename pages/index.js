import Head from 'next/head';
import HealthCheck from '../components/HealthCheck';

export default function HealthCheckPage() {
  return (
    <>
      <Head>
        <title>Rentlio ONE Health Check | Koliko je vaše poslovanje stvarno zdravo?</title>
        <meta
          name="description"
          content="Besplatna provjera za iznajmljivače u 3 minute: 12 pitanja, 6 područja i preporuke kako uštedjeti vrijeme uz Rentlio ONE."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Rentlio ONE Health Check" />
        <meta
          property="og:description"
          content="Koliko je vaše poslovanje stvarno zdravo? Provjerite u 3 minute."
        />
      </Head>
      <HealthCheck />
    </>
  );
}
