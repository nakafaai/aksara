import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.50$$ Km", value: false },
    { label: "$$1.22$$ Km", value: false },
    { label: "$$1.44$$ Km", value: true },
    { label: "$$2.40$$ Km", value: false },
    { label: "$$2.50$$ Km", value: false },
  ],
  id: [
    { label: "$$0{,}50$$ Km", value: false },
    { label: "$$1{,}22$$ Km", value: false },
    { label: "$$1{,}44$$ Km", value: true },
    { label: "$$2{,}40$$ Km", value: false },
    { label: "$$2{,}50$$ Km", value: false },
  ],
};

export default choices;
