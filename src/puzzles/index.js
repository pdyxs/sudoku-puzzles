import cartography from "./cartography";
import someThingsFogn from "./some-things-fogn";
import aMurderMostFogged from "./a-murder-most-fogged";
import littleFillers2 from "./little-fillers-2";
import whispersInTheMist from "./whispers-in-the-mist";
import plansOfAMedic from "./plans-of-a-medic";
import recountingTheCounting from "./recounting-the-counting";
import theGridOfForkingPaths from "./the-grid-of-forking-paths";
import recountingTheRooms from "./recounting-the-rooms";
import howYouLiveTheTimeWar from "./how-you-live-the-time-war";
import howYouLearnTheTimeWar from './how-you-learn-the-time-war';
import howTheTimeWarWorksUnsolved from "./how-the-time-war-works-unsolved";
import howTheTimeWarWorksSolved from "./how-the-time-war-works-solved";

export const series = [
    {
        name: "Experimental Fog",
        puzzles: [
            theGridOfForkingPaths,
            recountingTheCounting,
            aMurderMostFogged,
            cartography,
            whispersInTheMist,
            someThingsFogn,
            recountingTheRooms
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
            plansOfAMedic,
            howYouLearnTheTimeWar,
            howYouLiveTheTimeWar,
            howTheTimeWarWorksUnsolved,
            howTheTimeWarWorksSolved
        ]
    }
];