import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "long and messy.",
      value: false,
    },
    {
      label: "his cheeks were rough.",
      value: false,
    },
    {
      label: "dark circles.",
      value: false,
    },
    {
      label: "his body was thinning.",
      value: true,
    },
    {
      label: "shaving.",
      value: false,
    },
  ],
  id: [
    {
      label: "gondrong berantakan.",
      value: false,
    },
    {
      label: "pipinya kasar.",
      value: false,
    },
    {
      label: "lingkaran hitam.",
      value: false,
    },
    {
      label: "tubuhnya menipis.",
      value: true,
    },
    {
      label: "bercukur.",
      value: false,
    },
  ],
};

export default choices;
