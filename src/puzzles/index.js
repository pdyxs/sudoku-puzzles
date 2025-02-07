import cartography from "./cartography";
import someThingsFogn from "./some-things-fogn";
import aMurderMostFogged from "./a-murder-most-fogged";
import littleFillers2 from "./little-fillers-2";
import whispersInTheMist from "./whispers-in-the-mist";
import plansOfAMedic from "./plans-of-a-medic";
import recountingTheCounting from "./recounting-the-counting";

export const series = [
    {
        name: "Experimental Fog",
        puzzles: [
            recountingTheCounting,
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
        name: "other",
        hidePuzzleList: true,
        puzzles: [
            plansOfAMedic
        ]
    }
];