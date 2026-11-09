import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "cause",
  },
  stimulus: "bayu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "karena turbin angin menghasilkan asap yang harus diimbangi pembangkit lain",
        },
        {
          correct: false,
          label:
            "karena turbin angin terlalu mahal untuk dibangun dalam jumlah banyak",
        },
        {
          correct: false,
          label: "karena turbin angin hanya dapat dibangun di Sulawesi Selatan",
        },
        {
          correct: false,
          label: "karena angin di Indonesia tidak pernah bertiup cukup kencang",
        },
        {
          correct: true,
          label:
            "karena listrik dari angin jumlahnya berubah-ubah dan dapat terhenti",
        },
      ],
    },
  },
};

export default item;
