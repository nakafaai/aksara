import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$3.6$$ minutes", value: false },
    { label: "$$4.8$$ minutes", value: true },
    { label: "$$7.2$$ minutes", value: false },
    { label: "$$7.8$$ minutes", value: false },
    { label: "$$8.0$$ minutes", value: false },
  ],
  id: [
    { label: "$$3{,}6$$ menit", value: false },
    { label: "$$4{,}8$$ menit", value: true },
    { label: "$$7{,}2$$ menit", value: false },
    { label: "$$7{,}8$$ menit", value: false },
    { label: "$$8{,}0$$ menit", value: false },
  ],
};

export default choices;
