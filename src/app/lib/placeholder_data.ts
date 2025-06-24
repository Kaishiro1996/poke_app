const pokemon = [
    {
        id: 1,
        name: "Bulbasaur",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        types1 : "grass",
        types2 : "poison",
        
    },
    {
        id:2,
        name: "Espeon",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/196.png",
        types1 : "psychic",
        types2 : "",
        
    }
];

const teams = [
    {
        name: "Team Rocket",
        pokemon: ["1", "2"], // Add more Pokemon objects as needed
        user_id: "1", // Reference to the user ID
    },
    // Add more Team objects here
];

const users = [
    {
        id: "1",
        name: "Chelo",
        email: "marcelo_ema@hotmail.com",
        password: "password123",
        teams: teams[0],
    },
    // Add more User objects here
];

export { pokemon, teams, users };