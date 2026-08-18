import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Karte zeigt einen hohen Wassergehalt", value: false },
    { label: "Die Karte zeigt wenige Kohlenhydrate", value: false },
    { label: "Die Karte zeigt kein Fett", value: false },
    { label: "Die Karte zeigt, dass die Frucht Fett liefert", value: true },
    { label: "Die Karte zeigt keinen hohen Kohlenhydratgehalt", value: false },
  ],
};

export default choices;
