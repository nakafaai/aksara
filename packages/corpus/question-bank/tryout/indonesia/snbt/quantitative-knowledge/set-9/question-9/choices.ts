import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$Df = \\{x | x \\leq 5\\}$$", value: false },
    { label: "$$Df = \\{x | 2 < x \\leq 5\\}$$", value: false },
    { label: "$$Df = \\{x | x < -3 \\text{ or } 2 < x < 5\\}$$", value: false },
    {
      label: "$$Df = \\{x | x < -3 \\text{ or } 2 < x \\leq 5\\}$$",
      value: true,
    },
    {
      label: "$$Df = \\{x | x < -3 \\text{ or } 2 \\leq x \\leq 5\\}$$",
      value: false,
    },
  ],
  id: [
    { label: "$$Df = \\{x | x \\leq 5\\}$$", value: false },
    { label: "$$Df = \\{x | 2 < x \\leq 5\\}$$", value: false },
    {
      label: "$$Df = \\{x | x < -3 \\text{ atau } 2 < x < 5\\}$$",
      value: false,
    },
    {
      label: "$$Df = \\{x | x < -3 \\text{ atau } 2 < x \\leq 5\\}$$",
      value: true,
    },
    {
      label: "$$Df = \\{x | x < -3 \\text{ atau } 2 \\leq x \\leq 5\\}$$",
      value: false,
    },
  ],
};

export default choices;
