import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "impossibility",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ada panitia yang merupakan guru.",
        },
        {
          correct: false,
          label: "Ada peserta pelatihan yang merupakan guru.",
        },
        {
          correct: false,
          label: "Semua guru menerima sertifikat.",
        },
        {
          correct: false,
          label: "Ada penerima sertifikat yang menjadi panitia.",
        },
        {
          correct: false,
          label: "Tidak ada panitia yang menjadi peserta pelatihan.",
        },
      ],
    },
  },
};

export default item;
