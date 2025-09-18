// CharactersList.tsx
"use client";
import { useState } from "react";

type Character = {
  id: number;
  fullname: string;
  nickname: string;
  hogwartshouse: string;
  interpretedby: string;
  image: string;
  birthdate: string;
  children?: string[];
};

type Props = {
  characters: Character[];
};

export default function CharactersList({ characters }: Props) {
  const houses = Array.from(
    new Set(characters.map((c) => c.hogwartshouse).filter(Boolean))
  );
  const [selectedHouses, setSelectedHouses] = useState<string[]>([]);
  const [inputSearch, setInputSearch] = useState<string>("");

  const handleCheckbox = (house: string) => {
    setSelectedHouses((prev) =>
      prev.includes(house) ? prev.filter((h) => h !== house) : [...prev, house]
    );
  };
  function handleSearchInput(value: string) {
    setInputSearch(value);
  }

  const filteredHouses = selectedHouses.length
    ? characters.filter((c) => selectedHouses.includes(c.hogwartshouse))
    : characters;

  const searched = inputSearch
    ? filteredHouses.filter((c) =>
        c.fullname.toLowerCase().includes(inputSearch.toLowerCase())
      )
    : filteredHouses;

  return (
    <div className="">
      <div className="mb-4 px-8 w-full flex justify-between">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        <div className="flex gap-4">
          {houses.map((house) => (
            <label key={house} className="">
              <input
                type="checkbox"
                checked={selectedHouses.includes(house)}
                onChange={() => handleCheckbox(house)}
              />
              {house}
            </label>
          ))}
        </div>
      </div>
      <ul className="grid px-8">
        {searched.map((character) => (
          <li
            key={character.id}
            className="u-border-hover relative
            pl-12 -mt-[1px] border border-neutral-800 grid grid-cols-2"
          >
            <div className="flex flex-col">
              <h2 className="text-6xl tracking-tight font-medium">
                {character.fullname}
              </h2>
              <span>{character.nickname}</span>
              <span>{character.hogwartshouse}</span>
              <span>{character.interpretedby}</span>
              {character.children &&
                character.children.map((child) => (
                  <span key={child}>{child}</span>
                ))}
              <span>{character.birthdate}</span>
            </div>
            <img
              src={character.image}
              alt={character.fullname}
              className="w-full object-cover h-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
