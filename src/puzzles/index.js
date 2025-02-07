import cartography from "./cartography";
import someThingsFogn from "./some-things-fogn";
import aMurderMostFogged from "./a-murder-most-fogged";
import littleFillers2 from "./little-fillers-2";
import whispersInTheMist from "./whispers-in-the-mist";

export const series = [
    {
        name: "Experimental Fog",
        puzzles: [
            aMurderMostFogged,
            cartography,
            whispersInTheMist,
            someThingsFogn
        ]
    },
    {
        name: "Convergent Clues",
        puzzles: [
            littleFillers2
        ]
    },
    {
        name: "Wordoku",
        puzzles: []
    }
];