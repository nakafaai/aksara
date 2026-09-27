import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Perubahan dapat diterima jika asal dan alasannya terbuka, keragaman sumber terlihat, dan pertunjukan tetap utuh.",
        },
        {
          isCorrect: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
        {
          isCorrect: false,
          label:
            "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun.",
        },
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: false,
          label:
            "Kualitas pertunjukan cukup dinilai dari kemiripan kata-katanya dengan satu naskah tertulis yang dipilih.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
