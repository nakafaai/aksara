import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "sign-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "pengunjung tuli yang ditemui peserta di tempat kerja mereka",
        },
        {
          correct: false,
          label: "pengunjung balai warga pada hari Sabtu",
        },
        {
          correct: false,
          label: "relawan tuli yang mengajar kelas",
        },
        {
          correct: false,
          label: "lurah setempat",
        },
        {
          correct: false,
          label: "pelajar yang ikut kelas bahasa isyarat",
        },
      ],
    },
  },
};

export default item;
