import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$180$$ and $$20$$", value: true },
    { label: "$$180$$ and $$10$$", value: false },
    { label: "$$170$$ and $$15$$", value: false },
    { label: "$$170$$ and $$20$$", value: false },
    { label: "$$160$$ and $$25$$", value: false },
  ],
  id: [
    { label: "$$180$$ dan $$20$$", value: true },
    { label: "$$180$$ dan $$10$$", value: false },
    { label: "$$170$$ dan $$15$$", value: false },
    { label: "$$170$$ dan $$20$$", value: false },
    { label: "$$160$$ dan $$25$$", value: false },
  ],
};

export default choices;
