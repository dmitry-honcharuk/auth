export async function post<T = any, B extends Record<string, unknown> = any>(
  url: string,
  body: B,
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: response.status < 500 ? data.message : 'Something went wrong',
      status: response.status,
    };
  }

  return data;
}

export async function get<T = any>(
  url: string,
  options?: Partial<Request>,
): Promise<T> {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: response.status < 500 ? data.message : 'Something went wrong',
      status: response.status,
    };
  }

  return data;
}

export async function del<T = any>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: response.status < 500 ? data.message : 'Something went wrong',
      status: response.status,
    };
  }

  return data;
}
