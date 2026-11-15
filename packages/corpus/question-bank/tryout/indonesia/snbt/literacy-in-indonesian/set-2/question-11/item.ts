import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Teks B menolak kenaikan upah minimum, karena kenaikan upah akan membuat usaha mikro memangkas pekerjanya." },
        { correct: false, label: "Teks B menerima tujuan Teks A dan seluruh buktinya, tetapi meminta agar kenaikan ditunda selama tiga tahun." },
        { correct: true, label: "Teks B menerima tujuan Teks A, tetapi meragukan bukti Teks A untuk usaha mikro dan mengusulkan kenaikan yang dibedakan." },
        { correct: false, label: "Teks B meragukan bukti Teks A, sehingga menyimpulkan bahwa upah minimum saat ini sebenarnya sudah cukup untuk hidup layak." },
        { correct: false, label: "Teks B menerima tujuan Teks A, tetapi menuduh dewan pengupahan hanya mendengarkan suara pengusaha besar." },
      ],
    },
  },
};

export default item;
