import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "$$52{,}3\\text{ g}$$ und $$10{,}85\\text{ g}$$", value: false },
    { label: "$$52{,}3\\text{ g}$$ und $$10{,}58\\text{ g}$$", value: false },
    { label: "$$53{,}2\\text{ g}$$ und $$10{,}58\\text{ g}$$", value: false },
    { label: "$$53{,}2\\text{ g}$$ und $$10{,}85\\text{ g}$$", value: true },
    { label: "$$52{,}3\\text{ g}$$ und $$10{,}50\\text{ g}$$", value: false },
  ],
  en: [
    { label: "$$52.3\\text{ g}$$ and $$10.85\\text{ g}$$", value: false },
    { label: "$$52.3\\text{ g}$$ and $$10.58\\text{ g}$$", value: false },
    { label: "$$53.2\\text{ g}$$ and $$10.58\\text{ g}$$", value: false },
    { label: "$$53.2\\text{ g}$$ and $$10.85\\text{ g}$$", value: true },
    { label: "$$52.3\\text{ g}$$ and $$10.50\\text{ g}$$", value: false },
  ],
  id: [
    { label: "$$52{,}3\\text{ g}$$ dan $$10{,}85\\text{ g}$$", value: false },
    { label: "$$52{,}3\\text{ g}$$ dan $$10{,}58\\text{ g}$$", value: false },
    { label: "$$53{,}2\\text{ g}$$ dan $$10{,}58\\text{ g}$$", value: false },
    { label: "$$53{,}2\\text{ g}$$ dan $$10{,}85\\text{ g}$$", value: true },
    { label: "$$52{,}3\\text{ g}$$ dan $$10{,}50\\text{ g}$$", value: false },
  ],
};

export default choices;
