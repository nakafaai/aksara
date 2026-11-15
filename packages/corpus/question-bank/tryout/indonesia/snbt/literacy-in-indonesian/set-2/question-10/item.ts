import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Tradisi harus disalin persis agar tidak hilang, dan Laras membuktikannya dengan menghitung benang tanpa menemukan kesalahan." },
        { correct: true, label: "Tradisi dapat diteruskan sambil diubah oleh hidup generasi berikutnya, dan restu Ibu disampaikan lewat kain, bukan kata-kata." },
        { correct: false, label: "Tradisi dapat diteruskan sambil diubah oleh hidup generasi berikutnya, tetapi Ibu menolak perubahan itu dengan membiarkan kain tak selesai." },
        { correct: false, label: "Pendidikan di kota membuat anak meninggalkan tradisi, dan kain yang belum selesai melambangkan tradisi yang putus." },
        { correct: false, label: "Restu Ibu disampaikan lewat kain, bukan kata-kata, karena Ibu tidak menguasai bahasa yang dipakai Laras di kota." },
      ],
    },
  },
};

export default item;
