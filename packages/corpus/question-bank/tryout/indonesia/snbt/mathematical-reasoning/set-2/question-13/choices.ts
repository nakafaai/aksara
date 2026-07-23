import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$1.2$$ minutes", value: false },
    { label: "$$4.8$$ minutes", value: false },
    { label: "$$18.8$$ minutes", value: false },
    { label: "$$16.8$$ minutes", value: true },
    { label: "$$14.2$$ minutes", value: false },
  ],
  id: [
    { label: "$$1{,}2$$ menit", value: false },
    { label: "$$4{,}8$$ menit", value: false },
    { label: "$$18{,}8$$ menit", value: false },
    { label: "$$16{,}8$$ menit", value: true },
    { label: "$$14{,}2$$ menit", value: false },
  ],
};

export default choices;
