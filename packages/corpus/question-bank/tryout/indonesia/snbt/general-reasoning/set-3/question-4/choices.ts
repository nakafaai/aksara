import type { QuestionChoices } from "#corpus/question-bank/choices";

const choices: QuestionChoices = {
  en: [
    { label: "$$85$$ km/h", value: false },
    { label: "$$95$$ km/h", value: false },
    { label: "$$80$$ km/h", value: false },
    { label: "$$75$$ km/h", value: true },
    { label: "$$90$$ km/h", value: false },
  ],
  id: [
    { label: "$$85$$ km/jam", value: false },
    { label: "$$95$$ km/jam", value: false },
    { label: "$$80$$ km/jam", value: false },
    { label: "$$75$$ km/jam", value: true },
    { label: "$$90$$ km/jam", value: false },
  ],
};

export default choices;
