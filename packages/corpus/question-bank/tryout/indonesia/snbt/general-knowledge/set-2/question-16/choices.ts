import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "lang und zerzaust.",
      value: false,
    },
    {
      label: "seine Wangen waren rau.",
      value: false,
    },
    {
      label: "dunkle Ringe.",
      value: false,
    },
    {
      label: "seine Gestalt war schlanker geworden.",
      value: true,
    },
    {
      label: "sich rasieren.",
      value: false,
    },
  ],
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
      label: "his frame had grown leaner.",
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
      label: "tubuhnya tampak makin ramping.",
      value: true,
    },
    {
      label: "bercukur.",
      value: false,
    },
  ],
};

export default choices;
