import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Stärkt Aussage A", value: false },
    { label: "Schwächt Aussage A", value: false },
    { label: "Stärkt Aussage B", value: true },
    { label: "Schwächt Aussage B", value: false },
    { label: "Ist für beide Aussagen irrelevant", value: false },
  ],
  en: [
    { label: "Strengthens Statement A", value: false },
    { label: "Weakens Statement A", value: false },
    { label: "Strengthens Statement B", value: true },
    { label: "Weakens Statement B", value: false },
    { label: "Is irrelevant to both statements", value: false },
  ],
  id: [
    { label: "Memperkuat Pernyataan A", value: false },
    { label: "Memperlemah Pernyataan A", value: false },
    { label: "Memperkuat Pernyataan B", value: true },
    { label: "Memperlemah Pernyataan B", value: false },
    { label: "Tidak relevan dengan kedua pernyataan", value: false },
  ],
};

export default choices;
