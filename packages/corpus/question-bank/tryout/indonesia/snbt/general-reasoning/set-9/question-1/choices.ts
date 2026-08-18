import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
