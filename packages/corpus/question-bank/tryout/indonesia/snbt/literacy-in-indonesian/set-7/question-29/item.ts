import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "waste-meeting",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "teguran keras Pak Karto karena usulnya membakar sampah",
        },
        {
          correct: false,
          label: "rasa malu karena dituduh menjadi penyebab batuk anak Bu Ning",
        },
        {
          correct: false,
          label: "keputusan kelurahan menambah jadwal kedatangan truk sampah",
        },
        {
          correct: false,
          label: "kemungkinan ia diberi upah untuk mengolah kompos sendiri",
        },
        {
          correct: true,
          label: "tawaran Dina dan temannya mengambil sisa makanan setiap sore",
        },
      ],
    },
  },
};

export default item;
