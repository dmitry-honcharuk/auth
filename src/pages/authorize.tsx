import { useRouter } from 'next/router';
import { normalizeQueryParam } from '../app/backend/utils/normalizeQueryParam';
import { CustomerAuthScreen } from '../app/components/screens/CustomerAuthScreen';

export default function Authorize() {
  const { query } = useRouter();

  const { audience: audienceQuery, clientId: clientIdQuery } = query;

  if (!audienceQuery) {
    throw new Error('No audience was provided');
  }

  if (!clientIdQuery) {
    throw new Error('No client id was provided');
  }

  const audience = normalizeQueryParam(audienceQuery);
  const clientId = normalizeQueryParam(clientIdQuery);

  return <CustomerAuthScreen clientId={clientId} audience={audience} />;
}
