import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "wall-clock",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Membetulkan letak jarum jam yang sering terlambat.",
        },
        {
          correct: true,
          label: "Memutar jam tujuh putaran sambil menghitung pelan.",
        },
        {
          correct: false,
          label: "Berdoa di ruang tengah bersama Ibu dan cucunya.",
        },
        {
          correct: false,
          label: "Mengantar tamu yang datang sampai ke depan pintu.",
        },
        {
          correct: false,
          label: "Memutar jam sebanyak mungkin agar tidak berhenti.",
        },
      ],
    },
  },
};

export default item;
