import { initMongoose } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function findAllProducts(req, res) {
  return await Product.find().exec();
}

export default async function handler(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    console.log(ids, idsArray);
    res.json(
      await Product.find({
        _id: { $in: idsArray },
      }).exec()
    );
  } else {
    res.json(await findAllProducts());
  }
}
