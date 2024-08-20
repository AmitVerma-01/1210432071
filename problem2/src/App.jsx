import Product from './components/product'
import { product, categories } from './products'
function App() {
  // console.log(categories);/
  
  console.log(product.AMZ["Phone"][0].productName)
  return (
  <div>
    <select name="company" id="">
      <option value="company">Company</option>
      <option value="AMZ">AMZ</option>
      <option value="SNP">SNP</option>
      <option value="FLP">FLP</option>
      <option value="MYT">MYT</option>
      <option value="AZO">AZO</option>
    </select>
    <select name="" id="Category">
      {Object.keys(product.AMZ).map((key ,i)=> <option key={i} value={key}>{key}</option>)}
    </select>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 p-3'>
      {
        categories.forEach(item => product.AMZ[item].map((it, i) => <Product name={it.productName} key={i} availabilty={it.availabilty} price={it.price}/>  )) 
      }
    </div>
  </div>
  )
}

export default App
