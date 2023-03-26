import { useEffect, useState } from 'react'
import './app.css'

// eslint-disable-next-line camelcase
const cat_endopoint_ramdom_fact = 'https://catfact.ninja/fact'
const cat_prefix_image_url = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  useEffect(() => {
    fetch(cat_endopoint_ramdom_fact)
      .then(res => {
        if (!res.ok) {
          setFactError('No se ha podido recuperar la cita')
        }
        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setImageUrl(url)
      })
  }, [fact])

  return (
      <main>
          <h1>Random nekos</h1>
          {fact && <p className='fact'>{fact}</p>}
          <div className='refresh'>
            <p>Refresh the page to see a new Neko...</p>
          </div>
          {imageUrl && <img className='picture' src={`${cat_prefix_image_url}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
      </main>
  )
}
