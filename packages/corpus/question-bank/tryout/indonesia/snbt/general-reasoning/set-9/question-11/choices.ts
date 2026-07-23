import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$10$$ thousand", value: false },
    { label: "$$30$$ thousand", value: true },
    { label: "$$50$$ thousand", value: false },
    { label: "$$60$$ thousand", value: false },
    { label: "$$80$$ thousand", value: false },
  ],
  id: [
    { label: "$$10$$ ribu", value: false },
    { label: "$$30$$ ribu", value: true },
    { label: "$$50$$ ribu", value: false },
    { label: "$$60$$ ribu", value: false },
    { label: "$$80$$ ribu", value: false },
  ],
};

export default choices;
