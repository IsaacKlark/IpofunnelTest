const orders = [
  {
    id: 0,
    items: ["Item 1", "Item 2", "Item 3"],
    user: 1,
  },
  {
    id: 1,
    items: ["Item 11", "Item 12", "Item 13"],
    user: 2,
  },
  {
    id: 2,
    items: ["Item 21", "Item 22"],
    user: 2,
  },
  {
    id: 3,
    items: ["Item 21", "Item 22", "Item 23"],
    user: 3,
  },
];

export const getOrders = async function () {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, body: orders });
    }, 3000);
  });

  return res.body;
};
