import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Kinder spielen im Freien.",
      value: false,
    },
    {
      label: "Kinder haben mehr Gelegenheiten.",
      value: false,
    },
    {
      label: "Der Sommer bietet Kindern Gelegenheiten.",
      value: true,
    },
    {
      label: "Der Sommer spielt im Freien.",
      value: false,
    },
    {
      label: "Gelegenheiten finden im Freien statt.",
      value: false,
    },
  ],
  en: [
    {
      label: "Children play outdoors.",
      value: false,
    },
    {
      label: "Children have more opportunities.",
      value: false,
    },
    {
      label: "Summer gives children opportunities.",
      value: true,
    },
    {
      label: "Summer plays outdoors.",
      value: false,
    },
    {
      label: "Opportunities occur outdoors.",
      value: false,
    },
  ],
  id: [
    {
      label: "Anak bermain di luar ruangan.",
      value: false,
    },
    {
      label: "Anak memiliki lebih banyak kesempatan.",
      value: false,
    },
    {
      label: "Musim panas memberi anak kesempatan.",
      value: true,
    },
    {
      label: "Musim panas bermain di luar ruangan.",
      value: false,
    },
    {
      label: "Kesempatan terjadi di luar ruangan.",
      value: false,
    },
  ],
};

export default choices;
