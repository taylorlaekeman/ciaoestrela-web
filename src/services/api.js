const { API_URL } = window.env;

const buildError = (response, json) => ({
  status: response.status,
  message: json,
});

const post = async (url, body) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) throw buildError(response, json);
  return json;
};

const confirmPayment = async orderId => (
  post(`${API_URL}/payments/`, { order: orderId }));

const createOrder = async (contact, destination, items) => (
  post(`${API_URL}/orders/`, { contact, destination, items }));

export default {
  confirmPayment,
  createOrder,
};
