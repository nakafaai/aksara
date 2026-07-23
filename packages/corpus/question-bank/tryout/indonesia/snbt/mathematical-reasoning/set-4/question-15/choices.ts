import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$97.5$$ km/h", value: false },
    { label: "$$95.0$$ km/h", value: false },
    { label: "$$87.5$$ km/h", value: false },
    { label: "$$85.0$$ km/h", value: false },
    { label: "$$82.5$$ km/h", value: true },
  ],
  id: [
    { label: "$$97{,}5$$ km/jam", value: false },
    { label: "$$95{,}0$$ km/jam", value: false },
    { label: "$$87{,}5$$ km/jam", value: false },
    { label: "$$85{,}0$$ km/jam", value: false },
    { label: "$$82{,}5$$ km/jam", value: true },
  ],
};

export default choices;
