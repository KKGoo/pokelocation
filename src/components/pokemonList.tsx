import { getPokemonListItemDetails } from "@/services/pokeapi";
import { PokemonDetail, PokemonListProps } from "@/types/pokeapi";
import Link from "next/link";
import { useState, useEffect } from "react";

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const pokemonDetailsArray = await Promise.all(
        pokemonList.map(
          async (pokemon) => await getPokemonListItemDetails(pokemon)
        )
      );
      setPokemonDetails(pokemonDetailsArray);
    };

    fetchPokemonDetails();
  }, [pokemonList]);

  return (
    <ul>
      {pokemonDetails.map((pokemon) => (
        <li key={pokemon.id}>
          <Link href={`/pokemon/${pokemon.id}`}>
            <a>{pokemon.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
