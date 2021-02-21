export function post<B extends object>(url: string, body: B) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((r) => {
      if (!r.ok) {
        throw r;
      }

      return r;
    })
    .then((r) => r.json());
}
