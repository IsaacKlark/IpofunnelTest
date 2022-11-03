const shops = [
  {
    id: 0,
    itemName: "smartphone",
    count: 500,
  },
  {
    id: 1,
    itemName: "laptop",
    count: 1000,
  },
  {
    id: 2,
    itemName: "TV",
    count: 2000,
  },
  {
    id: 4,
    itemName: "watch",
    count: 700,
  },
];

export const getShops = async function () {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, body: shops });
    }, 3000);
  });

  return res.body;
};
