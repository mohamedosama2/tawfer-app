import { Food } from "../../models/Food.model";

function People(food: Food) {
  return (
    <div className="bg-white rounded-sm p-2 w-96 my-2 mx-2 ">
      <img
        alt={food._id}
        className=""
        src={
          food.customer.photo
            ? food.customer.photo
            : "https://divineyouwellness.com/blog/wp-content/uploads/2021/03/shutterstock_563564683-scaled.jpg"
        }
      />
      <h2 className="text-xl">{food.customer.username}</h2>
      <h3 className="text-lg">{food.price}</h3>
      <h5>{food.address}</h5>
    </div>
  );
}

export default People;
