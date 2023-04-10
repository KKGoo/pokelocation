import { useState, useEffect } from "react";
import { Pokemon } from "../types/pokeapi";
import PokemonService from "../services/pokeapi";
import { useRouter } from 'next/router'
import Link from 'next/link'

function PokemonList() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const router = useRouter()
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { pokemonList, total } = await PokemonService.getAll(page, limit);
      setPokemonList(pokemonList);
      setTotal(total);
      setLoading(false);
    }
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setPage(page - 1);
  };

  return (
    <>
      <div className="wrapper__pokemon">
        {loading && <p>Loading...</p>}
        {pokemonList.map((pokemon) => (
           <Link href={`/pokemon/${pokemon.id}`}>
          <li key={pokemon.id}>
            <div className="card">
              <div className="pokemonImage__wrap">
                <img
                  className="pokemonImage"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <div className="theme__wrap">
                  {pokemon.types.map((id) => (
                    <p className="theme">{id}</p>
                  ))}
                </div>
              </div>

              <div className="wrapper__pokemonInfo">
                <h1 className="pokemonTittle">
                  {pokemon.name} #{pokemon.id}{" "}
                </h1>
                <p>#{pokemon.abilities.join(" ")}</p>
              </div>
            </div>
          </li>
          </Link>
        ))}
      </div>
      <div className="buttons">
        <button disabled={page === 1} onClick={handlePrevPage}>
          Prev
        </button>
        <h2>
          Page {page} of {Math.ceil(total / limit)}
        </h2>

        <button
          disabled={page === Math.ceil(total / limit)}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PokemonList;
