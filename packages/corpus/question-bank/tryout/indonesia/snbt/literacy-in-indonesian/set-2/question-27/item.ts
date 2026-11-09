import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "conflict",
  },
  stimulus: "rice-field-drama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "perbedaan pendapat tentang menjual sawah warisan untuk modal usaha Bayu",
        },
        {
          correct: false,
          label:
            "larangan Bu Karta terhadap anak-anaknya yang ingin bekerja di kota",
        },
        {
          correct: false,
          label: "penolakan Ningsih untuk melanjutkan kuliah pertanian",
        },
        {
          correct: false,
          label: "pertengkaran Pak Karta dengan pembeli dari kota",
        },
        {
          correct: false,
          label: "keinginan Bayu pindah dari satu bengkel ke bengkel lain",
        },
      ],
    },
  },
};

export default item;
