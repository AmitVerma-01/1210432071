

const Product = ({name,availabilty,price}) => {
  return (
    <div className="h-72 flex flex-col bg-red-400 shadow-lg justify-center rounded-md  items-center w-48">
      <img src="" alt="product" className="w-40 h-40 bg-gray-600 rounded-md" />
        <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p>Price : {price}</p>
            <p>Availability : {availabilty}</p>
        </div>
    </div>
  )
}

export default Product
