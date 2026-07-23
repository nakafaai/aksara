import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$A = B$$ then $$E = F$$", value: false },
    { label: "$$A = B$$ or $$E = F$$", value: false },
    { label: "$$A \\neq B$$ or $$E = F$$", value: false },
    { label: "$$E \\neq F$$ or $$A \\neq B$$", value: false },
    { label: "$$A = B$$ or $$E \\neq F$$", value: true },
  ],
  id: [
    { label: "$$A = B$$ maka $$E = F$$", value: false },
    { label: "$$A = B$$ atau $$E = F$$", value: false },
    { label: "$$A \\neq B$$ atau $$E = F$$", value: false },
    { label: "$$E \\neq F$$ atau $$A \\neq B$$", value: false },
    { label: "$$A = B$$ atau $$E \\neq F$$", value: true },
  ],
};

export default choices;
