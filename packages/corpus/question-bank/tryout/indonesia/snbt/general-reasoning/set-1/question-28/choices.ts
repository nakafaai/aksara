import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "um 10 % niedriger", value: false },
    { label: "um 12 % niedriger", value: true },
    { label: "um 18 % niedriger", value: false },
    { label: "gleich hoch", value: false },
    { label: "um 8 % höher", value: false },
  ],
  en: [
    { label: "10% lower", value: false },
    { label: "12% lower", value: true },
    { label: "18% lower", value: false },
    { label: "unchanged", value: false },
    { label: "8% higher", value: false },
  ],
  id: [
    { label: "10% lebih rendah", value: false },
    { label: "12% lebih rendah", value: true },
    { label: "18% lebih rendah", value: false },
    { label: "sama dengan harga awal", value: false },
    { label: "8% lebih tinggi", value: false },
  ],
};

export default choices;
