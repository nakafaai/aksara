import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It is valid, because temperature is the manipulated variable",
        },
        {
          correct: true,
          label:
            "It is not valid, because the size of the calcium carbonate pieces also changed",
        },
        {
          correct: false,
          label:
            "It is valid, because the acid was the same in both experiments",
        },
        {
          correct: false,
          label:
            "It is not valid, because the mass of calcium carbonate should have risen with the temperature",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ia sah, kerana suhu ialah pemboleh ubah dimanipulasikan",
        },
        {
          correct: true,
          label:
            "Ia tidak sah, kerana saiz kepingan kalsium karbonat juga berubah",
        },
        {
          correct: false,
          label: "Ia sah, kerana asid adalah sama dalam kedua-dua eksperimen",
        },
        {
          correct: false,
          label:
            "Ia tidak sah, kerana jisim kalsium karbonat sepatutnya bertambah dengan suhu",
        },
      ],
    },
  },
};

export default item;
