export const postDeliveryForm = async (url: string, data: object) => {
  // sleep 2 s

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.status;
};
