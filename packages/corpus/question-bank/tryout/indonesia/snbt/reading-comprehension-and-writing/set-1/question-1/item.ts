import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "village-radio",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Radio komunitas di Desa Wangun berperan penting dalam kehidupan warganya.",
        },
        {
          correct: false,
          label:
            "Warga Desa Wangun berkumpul di balai desa setiap malam Jumat.",
        },
        {
          correct: false,
          label:
            "Para pemuda Desa Wangun belajar mengoperasikan pemancar sendiri.",
        },
        {
          correct: false,
          label:
            "Banjir di desa tetangga memerlukan saluran informasi yang cepat.",
        },
        {
          correct: false,
          label:
            "Radio komunitas memerlukan izin siaran resmi untuk memperluas jangkauan.",
        },
      ],
    },
  },
};

export default item;
