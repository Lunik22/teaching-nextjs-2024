import { NewMarketplaceItemForm } from "./NewMarketplaceItemForm";

export default async function NewPostPage() {
  console.log("NewPostPage");

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <p>New Product</p>
        <NewMarketplaceItemForm />
      </div>
    </div>
  );
}
