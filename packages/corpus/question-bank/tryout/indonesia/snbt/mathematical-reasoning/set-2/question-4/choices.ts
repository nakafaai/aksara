import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$12.25\\%$$", value: false },
    { label: "$$13.75\\%$$", value: true },
    { label: "$$14.50\\%$$", value: false },
    { label: "$$15.00\\%$$", value: false },
    { label: "$$15.75\\%$$", value: false },
  ],
  id: [
    { label: "$$12{,}25\\%$$", value: false },
    { label: "$$13{,}75\\%$$", value: true },
    { label: "$$14{,}50\\%$$", value: false },
    { label: "$$15{,}00\\%$$", value: false },
    { label: "$$15{,}75\\%$$", value: false },
  ],
};

export default choices;
