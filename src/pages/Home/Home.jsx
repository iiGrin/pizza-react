import { useEffect, useState } from 'react'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { PizzaBlock } from '../../components/PizzaCard/PizzaCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'

const BASE_URL = 'https://686d082714219674dcca2427.mockapi.io/pizzas'

export const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(3)
  const [activeSortType, setActiveSortType] = useState({ name: 'популярности', value: 'rating' })
  const [sortOrder, setSortOrder] = useState('desc')

  const category = activeCategory > 0 ? `category=${activeCategory}` : ''


  useEffect(() => {
    getPizzas()
  }, [activeCategory, activeSortType, sortOrder])

  const getPizzas = async () => {
    try {
      setIsLoading(true)
      const request = await fetch(`${BASE_URL}?${category}&sortBy=${activeSortType.value}&order=${sortOrder}`)
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

  const handleToggleOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <>
      <div className="content__top">
        <Categories categoryId={activeCategory} onClickCategory={(id) => setActiveCategory(id)} />
        <Sort sort={activeSortType} order={sortOrder} onChangeSort={(id) => setActiveSortType(id)} onChangeOrder={handleToggleOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...Array(8)].map((_, index) => <Skeleton key={index} />) : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  )
}
