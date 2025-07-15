import { useEffect, useState } from 'react'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { PizzaBlock } from '../../components/PizzaCard/PizzaCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { Pagination } from '../../components/Pagination/Pagination'

const BASE_URL = 'https://686d082714219674dcca2427.mockapi.io/pizzas?'

export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(3)
  const [activeSortType, setActiveSortType] = useState({ name: 'популярности', value: 'rating' })
  const [sortOrder, setSortOrder] = useState('desc')

  const category = activeCategory > 0 ? `category=${activeCategory}` : ''


  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, _] = useState(8)
  const [pageCount, setPageCount] = useState(0)


  useEffect(() => {
    getPizzas()
  }, [
    activeCategory, 
    activeSortType, 
    sortOrder, 
    searchValue,
    currentPage
  ])

  const renderPizzas = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeleton = [...Array(8)].map((_, index) => <Skeleton key={index} />)


  const getPizzas = async () => {
    setIsLoading(true)
    try {

      let requestUrl = `${BASE_URL}`

      if (searchValue) {
        requestUrl += `search=${searchValue}`
      } else {
        requestUrl += `limit=${itemsPerPage}&page=${currentPage}&${category}&sortBy=${activeSortType.value}&order=${sortOrder}`
      }
      const request = await fetch(requestUrl)
      const data = await request.json()
      setPizzas(Array.isArray(data) ? data : [])
      setIsLoading(false)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Failed to fetch pizzas:", error)
      setPizzas([])
      setIsLoading(false)
    }
  }

  const getPages = async () => {
    try {
      const request = await fetch('https://686d082714219674dcca2427.mockapi.io/pizzas')
      const totalItems = await request.json()
      if (searchValue.length > 1) {
        setPageCount(Math.ceil(renderPizzas.length / itemsPerPage))
      } else {
        setPageCount(Math.ceil(totalItems.length / itemsPerPage))
      }

    } catch (error) {
      console.error("Failed to fetch total pages:", error)
      setPageCount(1)
    }
  }

  const handleToggleOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handlePageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page)
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={activeCategory} onClickCategory={(id) => setActiveCategory(id)} />
        <Sort sort={activeSortType} order={sortOrder} onChangeSort={(id) => setActiveSortType(id)} onChangeOrder={handleToggleOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          skeleton
        ) : renderPizzas.length === 0 ? (
          <div>
            К сожалению, пиццы по вашему запросу не найдены.
          </div>
        ) : (
          renderPizzas
        )}
      </div>
      {!isLoading && pizzas.length > 0 && (
        <Pagination
          onPageChange={page => handlePageChange(page)}
          pageCount={pageCount}
          currentPage={currentPage}
          prevButtonLabel={'<'}
          nextButtonLabel={'>'}
        />
      )}
    </div>
  )
}