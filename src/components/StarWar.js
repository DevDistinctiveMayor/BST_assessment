import React, { useEffect, useState } from "react";

function StarWars() {
  const [starwars, setstarwars] = useState([]); // To store starwars data
  const [query, setQuery] = useState(""); // To store the search query
  const [loading, setLoading] = useState(false); // Loading state

  const fetchstarwars = async (searchQuery = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchQuery}`
      );
      const data = await response.json();
      setstarwars(data.results || []);
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
    setLoading(false);
  };

  // Fetch starwars data when the component mounts or when query changes
  useEffect(() => {
    fetchstarwars(query);
  }, [query]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div>
        <nav className="bg-blue-950 p-5 flex justify-between">
          <p className="text-white text-[20px]">StarWars App</p>
          <p className="text-white text-[10px] mt-[0.5rem]">Fronted Assessment Test for Ekundayo Mayowa T.</p>
        </nav>
        <div className="p-4 flex justify-center">
          <div className="sm:w-[30rem]">
            <input
              type="text"
              placeholder="Search Star Wars characters..."
              className="border p-2 mb-4 w-full"
              value={query}
              onChange={handleSearchChange}
               // Call search function as user types
            />

            {/* Table to display starwars */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border border-black px-4  py-2">Sr. No</th>
                    <th className="border border-black px-4 py-2">Name</th>
                    <th className="border border-black px-4 py-2">Height</th>
                    <th className="border border-black px-4 py-2">
                      Birth Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {starwars.map((person, index) => (
                    <tr key={person.name}>
                      <td className="border-2 border-yellow-500 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border-2 border-yellow-500 px-4 py-2">
                        {person.name}
                      </td>
                      <td className="border-2 border-yellow-500 px-4 py-2">
                        {person.height}
                      </td>
                      <td className="border-2 border-yellow-500 px-4 py-2">
                        {person.birth_year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StarWars;
