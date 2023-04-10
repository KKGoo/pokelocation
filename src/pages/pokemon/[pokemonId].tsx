import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  abilities: Array<{ ability: { name: string } }>;
  sprites: {
    front_default: string;
  };
  types: Array<{ type: { name: string } }>;
  location_area_encounters: string;
}

const Pokemon = () => {
  const {
    query : {pokemonId} 
} = useRouter()

  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, [pokemonId]);

  return (
    <div>
            <div className="modal-header">
        <h2>{pokemon?.name}</h2>
      </div>
      <div className="modal-body">
        {pokemon && (
          <>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Height: {pokemon.height} decimeters</p>
            <p>Weight: {pokemon.weight} hectograms</p>
            <p>Type(s): {pokemon.types.map(type => type.type.name).join(", ")}</p>
            <p>Abilities:</p>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>

  );
};

export default Pokemon;
