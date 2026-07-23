import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "Strengthens statement A", value: false },
    { label: "Weakens statement A", value: false },
    { label: "Strengthens statement B", value: false },
    { label: "Weakens statement B", value: false },
    { label: "Irrelevant to statements A and B", value: true },
  ],
  id: [
    { label: "Memperkuat pernyataan A", value: false },
    { label: "Memperlemah pernyataan A", value: false },
    { label: "Memperkuat pernyataan B", value: false },
    { label: "Memperlemah pernyataan B", value: false },
    { label: "Tidak relevan dengan pernyataan A dan B", value: true },
  ],
};

export default choices;
