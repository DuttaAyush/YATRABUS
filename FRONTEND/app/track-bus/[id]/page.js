import TrackBusClient from './TrackBusClient';

export function generateStaticParams() {
  return [
    { id: 'YB-994821' },
    { id: 'default' },
  ];
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <TrackBusClient params={resolvedParams} />;
}
