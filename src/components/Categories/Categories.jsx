import { useState } from 'react'

const CATEGORIES = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories = () => {
  const [activeTab, setActiveTab] = useState(0)

  const onClickCategory = (index) => {
    setActiveTab(index)
  }

  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeTab === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  )
}