export const stats = async (req, res) => {
  res.json({
    ok: true,
    visits: 0,
    contacts: 0,
    reviews: 0
  });
};
