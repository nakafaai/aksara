import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$15$$ minutes", value: false },
    { label: "$$30$$ minutes", value: false },
    { label: "$$45$$ minutes", value: false },
    { label: "$$60$$ minutes", value: true },
    { label: "$$75$$ minutes", value: false },
  ],
  id: [
    { label: "$$15$$ menit", value: false },
    { label: "$$30$$ menit", value: false },
    { label: "$$45$$ menit", value: false },
    { label: "$$60$$ menit", value: true },
    { label: "$$75$$ menit", value: false },
  ],
};

export default choices;
