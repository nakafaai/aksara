import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$0.11 \\times \\frac{35}{9}$$", value: true },
    { label: "$$0.22 \\times \\frac{17}{9}$$", value: false },
    { label: "$$0.33 \\times \\frac{34}{27}$$", value: false },
    { label: "$$0.55 \\times \\frac{34}{45}$$", value: false },
    { label: "$$0.66 \\times \\frac{17}{27}$$", value: false },
  ],
  id: [
    { label: "$$0{,}11 \\times \\frac{35}{9}$$", value: true },
    { label: "$$0{,}22 \\times \\frac{17}{9}$$", value: false },
    { label: "$$0{,}33 \\times \\frac{34}{27}$$", value: false },
    { label: "$$0{,}55 \\times \\frac{34}{45}$$", value: false },
    { label: "$$0{,}66 \\times \\frac{17}{27}$$", value: false },
  ],
};

export default choices;
