
export const FetchApi = (url: string, method: string = "GET", payload?: any) => {
    const apiReq =
      method !== "GET"
        ? fetch(url, {
            method,
            body: JSON.stringify(payload),
          })
        : fetch(url, { method });
  
    return apiReq.then((data) => data.json()).then(data => data.data);
  };
  