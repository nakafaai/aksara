import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "tea-picker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "panik karena takut kehilangan pekerjaannya di kebun teh",
        },
        {
          correct: false,
          label:
            "marah dan langsung memprotes keputusan mandor di depan pemetik lain",
        },
        {
          correct: false,
          label: "gembira karena pekerjaannya akan menjadi lebih ringan",
        },
        {
          correct: true,
          label: "tenang dan yakin bahwa keahlian memetiknya tetap berharga",
        },
        {
          correct: false,
          label: "acuh tak acuh karena ia sudah berencana pindah ke kota",
        },
      ],
    },
  },
};

export default item;
