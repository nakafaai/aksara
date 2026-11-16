import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Titration, $$90.1\\%$$" },
        { correct: false, label: "Precipitation, $$111\\%$$" },
        { correct: false, label: "Reacting lead(II) oxide with sulfuric acid and crystallising, $$90.1\\%$$" },
        { correct: true, label: "Precipitation, $$90.1\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pentitratan, $$90.1\\%$$" },
        { correct: false, label: "Pemendakan, $$111\\%$$" },
        { correct: false, label: "Tindak balas plumbum(II) oksida dengan asid sulfurik dan penghabluran, $$90.1\\%$$" },
        { correct: true, label: "Pemendakan, $$90.1\\%$$" },
      ],
    },
  },
};

export default item;
