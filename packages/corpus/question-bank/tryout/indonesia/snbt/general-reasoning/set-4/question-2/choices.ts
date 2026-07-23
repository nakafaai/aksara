import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$2$$ teddy bears", value: false },
    { label: "$$2$$ marbles", value: false },
    { label: "$$1$$ ball and $$1$$ Barbie doll", value: false },
    { label: "$$1$$ Barbie doll and $$1$$ marble", value: false },
    { label: "$$1$$ teddy bear and $$1$$ ball", value: true },
  ],
  id: [
    { label: "$$2$$ boneka beruang", value: false },
    { label: "$$2$$ kelereng", value: false },
    { label: "$$1$$ bola dan $$1$$ boneka Barbie", value: false },
    { label: "$$1$$ boneka Barbie dan $$1$$ kelereng", value: false },
    { label: "$$1$$ boneka beruang dan $$1$$ bola", value: true },
  ],
};

export default choices;
