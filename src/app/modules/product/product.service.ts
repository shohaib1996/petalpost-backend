import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = Product.create(payload);
  return result;
};
const getSingleProductFromDB = async (ProductID: string) => {
  const result = await Product.findById(ProductID);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  const queryObj = { ...query };

  const searchableFields = ["title", "brand"];

  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Product.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  let sort: { [key: string]: "asc" | "desc" | 1 | -1 } = { createdAt: -1 }; // Default sort by creation date in descending order (newest first)
  if (query.sort === "priceLowToHigh") {
    sort = { price: 1, createdAt: -1 }; // Sort by price ascending, then by creation date
  } else if (query.sort === "priceHighToLow") {
    sort = { price: -1, createdAt: -1 }; // Sort by price descending, then by creation date
  }

  const excludeFields = [
    "searchTerm",
    "sort",
    "limit",
    "page",
    "fields",
    "priceRange",
  ];
  excludeFields.forEach((field) => delete queryObj[field]);

  if (query.priceRange) {
    const [minPrice, maxPrice] = (query.priceRange as string)
      .split("-")
      .map(Number);
    queryObj.price = { $gte: minPrice, $lte: maxPrice };
  }

  const filteringQuery = searchQuery.find(queryObj);

  const sortingQuery = filteringQuery.sort(sort);

  const result = await sortingQuery.exec();

  return result;
};
const updateProductFromDB = async (
  ProductID: string,
  payload: Partial<TProduct>
) => {
  const ProductExist = await Product.findById(ProductID);

  if (!ProductExist) {
    throw new Error("Product Id not found");
  }

  const result = await Product.findByIdAndUpdate(
    ProductID,
    { $set: payload },
    { new: true, runValidators: true }
  );
  return result;
};
const deleteProductFromDB = async (ProductID: string) => {
  const ProductExist = await Product.findById(ProductID);

  if (!ProductExist) {
    throw new Error("Product Id not found");
  }

  const result = await Product.findByIdAndDelete(ProductID);
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
