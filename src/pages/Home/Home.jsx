import { useEffect, useState } from 'react'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { PizzaBlock } from '../../components/PizzaCard/PizzaCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'

export const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPizzas()
  }, [])

  const getPizzas = async () => {
    try {
      const request = await fetch('https://686d082714219674dcca2427.mockapi.io/pizzas')
      const data = await request.json()
      setPizzas(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      return {
        items: [],
      }
    }
  }
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...Array(8)].map((_, index) => <Skeleton key={index} />) : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  )
}
