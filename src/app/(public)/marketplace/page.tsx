import Link from "next/link";
import { createDB } from "../../../lib/db";

export default async function Home() {
  const db = createDB();

  const items = await db
    .selectFrom("marketplace")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

  return (
    <div className="grid grid-cols-2 gap-8">
      <Link href="/new-marketplace-item" className="col-span-2 bg-blue-100 py-2 px-3 rounded-3xl text-blue-600 py-4 hover:bg-blue-200 hover:scale-105 transition duration-300 text-center">
        Add new item
      </Link>
      {items.map((i) => (
        <div
          key={i.id}
          className="card bg-blue-700 w-150 drop-shadow-md rounded-3xl hover:bg-blue-800 hover:scale-105 transition duration-300"
        >
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{i.productName}</h2>
              <span className="text-md text-right bg-blue-100 py-2 px-3 rounded-2xl text-blue-600">
                {i.category}
              </span>
            </div>
            <p className="mt-4">{i.description}</p>
            <h3 className="text-lg font-bold">{i.price}€</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
