const users = [
  {
    id: 0,
    name: "John Carver",
    email: "john.carver@gmail.com",
    password: "qweqweqweqwe",
    orders: [2, 1],
  },
  {
    id: 1,
    name: "Isaac Clark",
    email: "isaac.clark@gmail.com",
    password: "qweqweqweqwe",
    orders: [0, 1],
  },
  {
    id: 2,
    name: "Robert Norton",
    email: "norton.robert@gmail.com",
    password: "qweqweqweqwe",
    orders: [0, 2],
  },
  {
    id: 3,
    name: "Ellie Langford",
    email: "ellie.langford@gmail.com",
    password: "qweqweqweqwe",
    orders: [0, 2],
  },
];

export const getUsers = async function () {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, body: users });
    }, 3000);
  });

  return res.body;
};
