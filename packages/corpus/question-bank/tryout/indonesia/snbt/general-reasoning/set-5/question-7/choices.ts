import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Die Karte zeigt einen hohen Wassergehalt", value: false },
    { label: "Die Karte zeigt wenige Kohlenhydrate", value: false },
    { label: "Die Karte zeigt kein Fett", value: false },
    { label: "Die Karte zeigt, dass die Frucht Fett liefert", value: true },
    { label: "Die Karte zeigt keinen hohen Kohlenhydratgehalt", value: false },
  ],
  en: [
    { label: "The card shows high water", value: false },
    { label: "The card shows low carbohydrates", value: false },
    { label: "The card shows no fat", value: false },
    { label: "The card shows that the fruit provides fat", value: true },
    { label: "The card does not show high carbohydrates", value: false },
  ],
  id: [
    { label: "Kartu menunjukkan kadar air tinggi", value: false },
    { label: "Kartu menunjukkan karbohidrat rendah", value: false },
    { label: "Kartu menunjukkan tidak ada lemak", value: false },
    { label: "Kartu menunjukkan buah tersebut memberikan lemak", value: true },
    { label: "Kartu tidak menunjukkan karbohidrat tinggi", value: false },
  ],
};

export default choices;
