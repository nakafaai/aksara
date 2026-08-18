import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
