import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$11$$ million tons", value: false },
    { label: "$$18$$ million tons", value: true },
    { label: "$$25$$ million tons", value: false },
    { label: "$$30$$ million tons", value: false },
    { label: "Cannot be determined", value: false },
  ],
  id: [
    { label: "$$11$$ juta ton", value: false },
    { label: "$$18$$ juta ton", value: true },
    { label: "$$25$$ juta ton", value: false },
    { label: "$$30$$ juta ton", value: false },
    { label: "Tidak dapat ditentukan", value: false },
  ],
};

export default choices;
