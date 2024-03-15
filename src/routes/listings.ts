import express, { Request, Response } from "express";
import { listingsModel } from "../lib/schemas/listing";
const router = express.Router();

router.get("/all", async (req: Request, response: Response) => {
  const { perPage, page, type, beds, price, baths, sort, order } = req.query;
  const filters: any = {};
  if (baths) filters.bath = baths;
  if (type) filters.type = type;
  if (price) filters.price = price;
  if (beds) filters.beds = beds;
  const sortField = sort ? `${sort}` : "type";

  if (perPage && page) {
    const skip = (+page - 1) * +perPage;
    const listings = await listingsModel
      .find({ ...filters })
      .sort({ [sortField]: order ? "desc" : "asc" })
      .limit(+perPage)
      .skip(skip);
    return response.json(listings);
  }
  const listings = await listingsModel.find({});
  return response.json(listings);
});

router.post("/update", async (req: Request, response: Response) => {
  const { brokerTitle, type, address, updates } = req.body;
  
  let listing = await listingsModel.findOneAndUpdate(
    { brokerTitle, type, address },
    updates,
    { new: true }
  );

  if (!listing) return response.status(402).send("Listing Not Found");

  return response.json(listing);
});

export default router;
