import { Link } from 'react-router-dom'

const WOMEN = [
  ['XS', '32', '26', '35'], ['S', '34', '28', '37'], ['M', '36', '30', '39'], ['L', '38', '32', '41'], ['XL', '40', '34', '43'],
]
const MEN = [
  ['S', '36', '30', '28'], ['M', '38', '32', '29'], ['L', '40', '34', '30'], ['XL', '42', '36', '30.5'], ['XXL', '44', '38', '31'],
]

function SizeTable({ caption, columns, rows }) {
  return (
    <div className="table-wrap">
      <table className="size-table">
        <caption>{caption}</caption>
        <thead>
          <tr>{columns.map((c) => <th scope="col" key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([size, ...rest]) => (
            <tr key={size}>
              <th scope="row">{size}</th>
              {rest.map((value, i) => <td key={i}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SizeGuide() {
  return (
    <div className="container page">
      <header className="page-head">
        <h1>Size guide</h1>
        <p>Body measurements in inches. These figures are invented for this coursework project.</p>
      </header>
      <SizeTable caption="Women's sizes, XS to XL" columns={['Size', 'Bust', 'Waist', 'Hip']} rows={WOMEN} />
      <SizeTable caption="Men's sizes, S to XXL" columns={['Size', 'Chest', 'Waist', 'Kurta length (shorter fit)']} rows={MEN} />
      <p>Between sizes? Choose the larger one for lawn and linen, which relax with washing. Not every product is offered in every size, so check the product page. <Link to="/shop">Back to the collection</Link></p>
    </div>
  )
}

export default SizeGuide
