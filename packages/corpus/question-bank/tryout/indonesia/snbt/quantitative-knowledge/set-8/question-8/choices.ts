import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$2$$ years", value: false },
    { label: "$$3$$ years", value: false },
    { label: "$$4$$ years", value: false },
    { label: "$$5$$ years", value: false },
    { label: "$$6$$ years", value: true },
  ],
  id: [
    { label: "$$2$$ tahun", value: false },
    { label: "$$3$$ tahun", value: false },
    { label: "$$4$$ tahun", value: false },
    { label: "$$5$$ tahun", value: false },
    { label: "$$6$$ tahun", value: true },
  ],
};

export default choices;
