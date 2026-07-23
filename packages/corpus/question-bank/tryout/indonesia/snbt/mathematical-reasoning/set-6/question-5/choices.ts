import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1 : \\sqrt[3]{2}$$", value: true },
    { label: "$$\\sqrt[3]{2} : 1$$", value: false },
    { label: "$$1 : \\sqrt{2}$$", value: false },
    { label: "$$\\sqrt{2} : 1$$", value: false },
    { label: "$$1 : \\sqrt{3}$$", value: false },
  ],
  id: [
    { label: "$$1 : \\sqrt[3]{2}$$", value: true },
    { label: "$$\\sqrt[3]{2} : 1$$", value: false },
    { label: "$$1 : \\sqrt{2}$$", value: false },
    { label: "$$\\sqrt{2} : 1$$", value: false },
    { label: "$$1 : \\sqrt{3}$$", value: false },
  ],
};

export default choices;
