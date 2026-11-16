import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "All chicks barred; a quarter of the second-generation daughters barred",
        },
        {
          correct: false,
          label:
            "Half of each sex barred; half of the second-generation daughters barred",
        },
        {
          correct: true,
          label:
            "Sons all barred and daughters all plain; half of the second-generation daughters barred",
        },
        {
          correct: false,
          label:
            "Sons all plain and daughters all barred; no second-generation daughters barred",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua anak ayam berbelang; satu perempat anak betina generasi kedua berbelang",
        },
        {
          correct: false,
          label:
            "Separuh setiap jantina berbelang; separuh anak betina generasi kedua berbelang",
        },
        {
          correct: true,
          label:
            "Semua anak jantan berbelang dan semua anak betina polos; separuh anak betina generasi kedua berbelang",
        },
        {
          correct: false,
          label:
            "Semua anak jantan polos dan semua anak betina berbelang; tiada anak betina generasi kedua berbelang",
        },
      ],
    },
  },
};

export default item;
