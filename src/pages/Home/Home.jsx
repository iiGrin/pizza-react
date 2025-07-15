import { useEffect, useState } from 'react'

import { Categories } from '../../components/Categories/Categories'
import { Sort } from '../../components/Sort/Sort'
import { PizzaBlock } from '../../components/PizzaCard/PizzaCard'
import { Skeleton } from '../../components/Skeleton/Skeleton'
import { Pagination } from '../../components/Pagination/Pagination'

export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, _] = useState(8)
  const [pageCount, setPageCount] = useState(0)


  useEffect(() => {
    getPizzas()
    getPages()

  }, [searchValue, currentPage])

  const renderPizzas = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  const skeleton = [...Array(8)].map((_, index) => <Skeleton key={index} />)

  const getPizzas = async () => {
    setIsLoading(true)
    try {
      let url = `https://686d082714219674dcca2427.mockapi.io/pizzas?`

      if (searchValue) {
        url += `search=${searchValue}`
      } else {
        url += `limit=${itemsPerPage}&page=${currentPage}`
      }
      const request = await fetch(url)
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

  const handlePageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page)
  }

  console.log('render')


  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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