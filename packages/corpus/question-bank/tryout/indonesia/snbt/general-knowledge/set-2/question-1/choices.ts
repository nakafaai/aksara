import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "worsen.", value: false },
    { label: "cause.", value: false },
    { label: "foster.", value: false },
    { label: "reduce.", value: true },
    { label: "eliminate.", value: false },
  ],
  id: [
    { label: "memperparah.", value: false },
    { label: "menyebabkan.", value: false },
    { label: "menumbuhkan.", value: false },
    { label: "mengurangi.", value: true },
    { label: "menghilangkan.", value: false },
  ],
};

export default choices;
