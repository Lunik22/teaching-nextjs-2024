"use client";

import { useForm } from "react-hook-form";

import { newItem } from "./new-item-action";

interface FormValues {
  productName: string;
  description: string;
  price: number;
  category: string;
}

export function NewMarketplaceItemForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        newItem(data.productName, data.description, data.price, data.category);
      })}
    >
      <label className="my-4 input input-bordered flex items-center gap-2">
        Name
        <input
          {...register("productName")}
          type="text"
          className="grow"
          placeholder=""
        />
      </label>
      <textarea
        {...register("description")}
        className="textarea textarea-bordered"
        placeholder="Description"
      ></textarea>
      <label className="my-4 input input-bordered flex items-center gap-2">
        Price
        <input
          {...register("price")}
          type="number"
          className="grow text-right"
          placeholder=""
        />
      </label>
      <select defaultValue="Pick a category" className="select select-primary my-4" {...register("category")}>
        <option disabled={true}>Pick a category</option>
        <option value="Electronics">Electronics</option>
        <option value="Cars">Cars</option>
        <option value="Furniture">Furniture</option>
      </select>
      <input className="btn btn-sm btn-outline" type="submit" value="Create" />
    </form>
  );
}
