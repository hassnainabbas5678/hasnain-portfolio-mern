import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json({ ok: true, review });
};

export const getReviews = async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ ok: true, reviews });
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
