import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Copper(II) carbonate, which gives black copper(II) oxide and carbon dioxide",
        },
        {
          correct: false,
          label: "Iron(II) nitrate, which gives a red-brown residue",
        },
        {
          correct: false,
          label:
            "Copper(II) nitrate, which gives a black residue and a colourless gas only",
        },
        {
          correct: true,
          label:
            "Copper(II) nitrate, which gives black copper(II) oxide, brown nitrogen dioxide and oxygen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kuprum(II) karbonat, yang menghasilkan kuprum(II) oksida hitam dan karbon dioksida",
        },
        {
          correct: false,
          label: "Ferum(II) nitrat, yang menghasilkan baki perang kemerahan",
        },
        {
          correct: false,
          label:
            "Kuprum(II) nitrat, yang menghasilkan baki hitam dan gas tanpa warna sahaja",
        },
        {
          correct: true,
          label:
            "Kuprum(II) nitrat, yang menghasilkan kuprum(II) oksida hitam, nitrogen dioksida perang dan oksigen",
        },
      ],
    },
  },
};

export default item;
