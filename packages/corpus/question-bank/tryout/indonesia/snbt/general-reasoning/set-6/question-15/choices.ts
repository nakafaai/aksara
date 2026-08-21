import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Biskuit", value: false },
    { label: "Molen", value: false },
    { label: "Pia", value: false },
    { label: "Sus", value: true },
    { label: "Tart", value: false },
  ],
  en: [
    { label: "biscuit", value: false },
    { label: "molen", value: false },
    { label: "pia", value: false },
    { label: "sus", value: true },
    { label: "tart", value: false },
  ],
  id: [
    { label: "biskuit", value: false },
    { label: "molen", value: false },
    { label: "pia", value: false },
    { label: "sus", value: true },
    { label: "tart", value: false },
  ],
};

export default choices;
