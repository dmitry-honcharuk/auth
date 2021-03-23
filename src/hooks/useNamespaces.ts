import { useEffect, useState } from 'react';
import { Namespace } from '../../core/entities/namespace';

export function useNamespaces() {
  const [{ fetched, namespaces }, setState] = useState<{
    fetched: boolean;
    namespaces: Namespace[];
  }>({ fetched: false, namespaces: [] });

  useEffect(() => {
    if (!fetched) {
      fetch('/api/namespaces')
        .then((r) => r.json())
        .then((ns) => setState({ fetched: true, namespaces: ns }));
    }
  }, [fetched, setState]);

  return { fetched, namespaces };
}
