import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "summary",
  },
  stimulus: "banda-nutmeg",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pala Banda pertama kali dibawa ke Eropa oleh VOC pada abad ke-17.",
        },
        {
          correct: false,
          label:
            "Perjanjian Breda adalah peristiwa terpenting dalam seluruh sejarah Kepulauan Banda.",
        },
        {
          correct: false,
          label:
            "Pala menjadi mahal karena hanya tumbuh di Mauritius dan Grenada.",
        },
        {
          correct: false,
          label:
            "Orang Banda berhasil mempertahankan perdagangan bebas hingga abad ke-19.",
        },
        {
          correct: true,
          label:
            "Monopoli pala VOC dibangun dengan kekerasan, lalu runtuh setelah pala menyebar.",
        },
      ],
    },
  },
};

export default item;
