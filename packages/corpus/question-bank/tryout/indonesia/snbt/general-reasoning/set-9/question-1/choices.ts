import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$127$$ students", value: false },
    { label: "$$126$$ students", value: false },
    { label: "$$125$$ students", value: false },
    { label: "$$124$$ students", value: false },
    { label: "$$123$$ students", value: true },
  ],
  id: [
    { label: "$$127$$ siswa", value: false },
    { label: "$$126$$ siswa", value: false },
    { label: "$$125$$ siswa", value: false },
    { label: "$$124$$ siswa", value: false },
    { label: "$$123$$ siswa", value: true },
  ],
};

export default choices;
