import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.72$$ Km", value: false },
    { label: "$$1.44$$ Km", value: false },
    { label: "$$2.88$$ Km", value: true },
    { label: "$$3.66$$ Km", value: false },
    { label: "$$4.20$$ Km", value: false },
  ],
  id: [
    { label: "$$0{,}72$$ Km", value: false },
    { label: "$$1{,}44$$ Km", value: false },
    { label: "$$2{,}88$$ Km", value: true },
    { label: "$$3{,}66$$ Km", value: false },
    { label: "$$4{,}20$$ Km", value: false },
  ],
};

export default choices;
