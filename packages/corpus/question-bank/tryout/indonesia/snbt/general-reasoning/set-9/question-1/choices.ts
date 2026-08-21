import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "$$127$$ Besucher",
      value: false,
    },
    {
      label: "$$126$$ Besucher",
      value: false,
    },
    {
      label: "$$125$$ Besucher",
      value: false,
    },
    {
      label: "$$124$$ Besucher",
      value: false,
    },
    {
      label: "$$123$$ Besucher",
      value: true,
    },
  ],
  en: [
    { label: "$$127$$ visitors", value: false },
    { label: "$$126$$ visitors", value: false },
    { label: "$$125$$ visitors", value: false },
    { label: "$$124$$ visitors", value: false },
    { label: "$$123$$ visitors", value: true },
  ],
  id: [
    { label: "$$127$$ pengunjung", value: false },
    { label: "$$126$$ pengunjung", value: false },
    { label: "$$125$$ pengunjung", value: false },
    { label: "$$124$$ pengunjung", value: false },
    { label: "$$123$$ pengunjung", value: true },
  ],
};

export default choices;
