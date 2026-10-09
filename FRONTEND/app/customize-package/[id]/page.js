import CustomizePackageClient from './CustomizePackageClient';

export function generateStaticParams() {
  return [
    { id: 'chardham' },
    { id: 'default' },
  ];
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <CustomizePackageClient params={resolvedParams} />;
}
