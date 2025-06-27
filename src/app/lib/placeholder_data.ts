const pokemon = [
    {
      id: "e52c939f-0221-4bc6-a4f7-595c122a23d5",
      name: "Espeon",
      nickname: "Shiro",
      id_trainer: "2b86d9d6-ab9c-44a6-84ff-9529f31a4468", // Reference to the user ID
      id_team: "d2809436-2e52-42b6-bf87-39974e97264e", // Reference to the team ID
      pokedex_number: 196,
    move1:"Expanding Force",
    move2:"Shadow Ball",
    move3:"Morning Sun",
    move4: "Dazzling Gleam",
    shiny: false,
    ability: "Magic Guard",
    },
    {
        id: "2afdfd51-c64f-43ec-91f8-44809919116f", // Example UUID
        name: "Umbreon",
        nickname: "Kuro",
        id_trainer: "2b86d9d6-ab9c-44a6-84ff-9529f31a4468", // Reference to the user ID
        id_team: "d2809436-2e52-42b6-bf87-39974e97264e", // Reference to the team ID
        pokedex_number: 197,
        move1: "Foul Play",
        move2: "Snarl",
        move3: "Helping Hand",
        move4: "Moonlight",
        shiny: true,
        ability: "Inner Focus",


      
        
    }
];

const teams = [
    {   
        id: "d2809436-2e52-42b6-bf87-39974e97264e", // Example UUID
        name: "My Team",
        user_id: "2b86d9d6-ab9c-44a6-84ff-9529f31a4468", // Reference to the user ID
        pokemon1: "e52c939f-0221-4bc6-a4f7-595c122a23d5", // Reference to the first Pokemon ID
        pokemon2: "2afdfd51-c64f-43ec-91f8-44809919116f",
        pokemon3: null, // Optional, can be null
        pokemon4: null, // Optional, can be null
        pokemon5: null, // Optional, can be null
        pokemon6: null, // Optional, can be null
    },
    // Add more Team objects here
];

const users = [
    {
        id: "2b86d9d6-ab9c-44a6-84ff-9529f31a4468",
        name: "Chelo",
        email: "marcelo_ema@hotmail.com",
        password: "password123",
      
    },
    // Add more User objects here
];

export { pokemon, teams, users };