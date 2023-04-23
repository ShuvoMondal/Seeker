import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap'
// import axios from 'axios'
import Search from '@/components/ui/Search';
import Header from '@/components/ui/Header';
import Card from '@/components/jobs/Card';
// import CharactersCard from './components/characters/CharactersCard';

const Home = () => {

  // const [items, setItems] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  console.warn(query);
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const result = await axios(
  //       `https://www.breakingbadapi.com/api/characters?name=${query}`
  //     )


  //     setItems(result.data)
  //     setIsLoading(false)
  //   }

  //   fetchItems()
  // },[query])


  return (
    <Container fluid className='container-fluid overflow-hidden'>
      <Header />
      <Search getQuery={(q)=> setQuery(q)}/>
      {/* <Card/> */}
      {/* <CharactersCard isLoading={isLoading} items={items}/> */}
    </Container>
  );
}

export default Home;