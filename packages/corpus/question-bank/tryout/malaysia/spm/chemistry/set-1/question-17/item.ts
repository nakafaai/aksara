import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The initial rate is higher, and the final volume of gas is the same as in experiment I",
        },
        {
          correct: false,
          label:
            "The initial rate is the same, and the final volume of gas is twice the final volume in experiment I",
        },
        {
          correct: false,
          label:
            "The initial rate is higher, and the final volume of gas is half the final volume in experiment I",
        },
        {
          correct: true,
          label:
            "The initial rate is higher, and the final volume of gas is twice the final volume in experiment I",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kadar tindak balas awal lebih tinggi, dan isi padu akhir gas sama dengan isi padu akhir dalam eksperimen I",
        },
        {
          correct: false,
          label:
            "Kadar tindak balas awal sama, dan isi padu akhir gas ialah dua kali isi padu akhir dalam eksperimen I",
        },
        {
          correct: false,
          label:
            "Kadar tindak balas awal lebih tinggi, dan isi padu akhir gas ialah separuh isi padu akhir dalam eksperimen I",
        },
        {
          correct: true,
          label:
            "Kadar tindak balas awal lebih tinggi, dan isi padu akhir gas ialah dua kali isi padu akhir dalam eksperimen I",
        },
      ],
    },
  },
};

export default item;
