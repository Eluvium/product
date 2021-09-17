/**
 * Handle response
 * @param {Response} response
 * @return {Promise<string>}
 */
export function handleResponse(response) {
  return response.text().then((text) => {
    let error = response.statusText;
    console.log(response)
    try {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
          // auto logout if 401 Unauthorized
          // or 403 Forbidden response returned from api
          // backendService.logout()
          // location.reload(true)
        }

        error = data && data.message;
        console.log("werwerwe")
        return Promise.reject(error);
      }
      return data;
    } catch (error) {
      console.log("qqqqq")
      return Promise.reject(error);
    }
  });
}
