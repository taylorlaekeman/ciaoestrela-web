const BASE_URL = 'http://localhost:8080';
const OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const buildError = (response, json) => ({
  status: response.status,
  message: json,
});

const createOrder = async (contact, destination, items) => {
  const body = JSON.stringify({
    contact,
    destination,
    items,
  });
  const response = await fetch(`${BASE_URL}/orders/`, { ...OPTIONS, body });
  const json = await response.json();
  if (!response.ok) throw buildError(response, json);
  return json;
};

export default {
  createOrder,
};
