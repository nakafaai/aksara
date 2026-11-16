import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "It leaves the glass at $$53^\\circ$$ to the normal",
        },
        {
          correct: false,
          label: "It is totally internally reflected",
        },
        {
          correct: false,
          label: "It leaves the glass at $$39^\\circ$$ to the normal",
        },
        {
          correct: false,
          label: "It leaves the glass at $$45^\\circ$$ to the normal",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Sinar keluar dari kaca pada $$53^\\circ$$ dari normal",
        },
        {
          correct: false,
          label: "Sinar mengalami pantulan dalam penuh",
        },
        {
          correct: false,
          label: "Sinar keluar dari kaca pada $$39^\\circ$$ dari normal",
        },
        {
          correct: false,
          label: "Sinar keluar dari kaca pada $$45^\\circ$$ dari normal",
        },
      ],
    },
  },
};

export default item;
