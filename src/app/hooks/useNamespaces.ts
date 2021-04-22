import { useEffect, useState } from 'react';
import { NamespaceEntity } from '../../core/entities/namespace';
import { get } from '../services/api';

export function useNamespaces() {
  const [{ fetched, namespaces }, setState] = useState<{
    fetched: boolean;
    namespaces: NamespaceEntity[];
  }>({ fetched: false, namespaces: [] });

  useEffect(() => {
    if (!fetched) {
      get('/api/namespaces').then((ns) =>
        setState({ fetched: true, namespaces: ns }),
      );
    }
  }, [fetched, setState]);

  return { fetched, namespaces };
}
