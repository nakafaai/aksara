import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1, 2, \\text{ and } 3$$", value: false },
    { label: "$$1 \\text{ and } 3$$", value: true },
    { label: "$$2 \\text{ and } 4$$", value: false },
    { label: "$$4 \\text{ only}$$", value: false },
    { label: "All correct", value: false },
  ],
  id: [
    { label: "$$1, 2, \\text{ dan } 3$$", value: false },
    { label: "$$1 \\text{ dan } 3$$", value: true },
    { label: "$$2 \\text{ dan } 4$$", value: false },
    { label: "$$4 \\text{ saja}$$", value: false },
    { label: "Semua benar", value: false },
  ],
};

export default choices;
