import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The batch needs $$400\\text{ kg}$$ of silica, and borosilicate glass expands more than soda-lime glass when heated",
        },
        {
          correct: false,
          label:
            "The batch needs $$360\\text{ kg}$$ of silica, and borosilicate glass resists sudden heating",
        },
        {
          correct: false,
          label:
            "The batch needs $$400\\text{ kg}$$ of silica, and light darkens photochromic glass by oxidising silver ions",
        },
        {
          correct: true,
          label:
            "The batch needs $$400\\text{ kg}$$ of silica, borosilicate glass expands little when heated, and light darkens photochromic glass by reducing silver ions to silver atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kelompok itu memerlukan $$400\\text{ kg}$$ silika, dan kaca borosilikat mengembang lebih banyak daripada kaca soda kapur apabila dipanaskan",
        },
        {
          correct: false,
          label:
            "Kelompok itu memerlukan $$360\\text{ kg}$$ silika, dan kaca borosilikat tahan pemanasan mendadak",
        },
        {
          correct: false,
          label:
            "Kelompok itu memerlukan $$400\\text{ kg}$$ silika, dan cahaya menggelapkan kaca fotokromik dengan mengoksidakan ion argentum",
        },
        {
          correct: true,
          label:
            "Kelompok itu memerlukan $$400\\text{ kg}$$ silika, kaca borosilikat sedikit mengembang apabila dipanaskan, dan cahaya menggelapkan kaca fotokromik dengan menurunkan ion argentum kepada atom argentum",
        },
      ],
    },
  },
};

export default item;
