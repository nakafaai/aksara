import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Perubahan dapat diterima jika asal dan alasannya terbuka, keragaman sumber terlihat, dan pertunjukan tetap utuh.",
        },
        {
          correct: false,
          label: "Setiap perubahan dalam adaptasi pasti merusak tradisi.",
        },
        {
          correct: false,
          label:
            "Karena versi berbeda, kelompok tidak perlu menjelaskan sumber atau perubahan apa pun.",
        },
        {
          correct: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          correct: false,
          label:
            "Kualitas pertunjukan cukup dinilai dari kemiripan kata-katanya dengan satu naskah tertulis yang dipilih.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
