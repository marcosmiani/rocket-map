
interface BasicHTTPResponse {
  status: number;
  statusText: string;
  json: Function
}

// UTILITY FUNCTIONS
export function checkStatus (response: BasicHTTPResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    throw error
  }
}

export function parseJSON (response: BasicHTTPResponse) {
  return response.json()
}
