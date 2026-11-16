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
            "Hydrochloric acid gives a larger final volume of hydrogen, because it is a strong acid",
        },
        {
          correct: true,
          label:
            "Both acids give 60 cm³ in the end, and in the first 30 s hydrochloric acid gives hydrogen about 2.7 times as fast, because its hydrogen ion concentration is higher",
        },
        {
          correct: false,
          label:
            "Both acids give 60 cm³ in the end, and ethanoic acid catches up because its molecules ionise faster as the reaction goes on",
        },
        {
          correct: false,
          label:
            "Ethanoic acid gives only about 30 cm³, because only part of its molecules ionise",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Asid hidroklorik menghasilkan isi padu akhir hidrogen yang lebih besar, kerana ia asid kuat",
        },
        {
          correct: true,
          label:
            "Kedua-dua asid akhirnya menghasilkan 60 cm³, dan dalam 30 s pertama asid hidroklorik menghasilkan hidrogen kira-kira 2.7 kali lebih cepat, kerana kepekatan ion hidrogennya lebih tinggi",
        },
        {
          correct: false,
          label:
            "Kedua-dua asid akhirnya menghasilkan 60 cm³, dan asid etanoik dapat mengejar kerana molekulnya mengion lebih cepat semasa tindak balas berlaku",
        },
        {
          correct: false,
          label:
            "Asid etanoik hanya menghasilkan kira-kira 30 cm³, kerana hanya sebahagian molekulnya mengion",
        },
      ],
    },
  },
};

export default item;
