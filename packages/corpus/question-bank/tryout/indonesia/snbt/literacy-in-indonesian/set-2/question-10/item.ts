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
        { correct: false, label: "Tradisi harus disalin persis agar tidak hilang, sebagaimana ditunjukkan oleh benang yang tidak satu pun salah." },
        { correct: true, label: "Tradisi keluarga itu diteruskan sambil diubah oleh hidup yang dipilih Laras." },
        { correct: false, label: "Kain yang belum selesai melambangkan tradisi keluarga yang putus karena Laras pergi." },
        { correct: true, label: "Ibu tidak menyatakan restunya secara terang-terangan, tetapi penerimaannya tampak lewat kain yang ia tenun." },
        { correct: false, label: "Ibu diam karena tidak menguasai bahasa yang dipakai Laras di kota." },
      ],
    },
  },
};

export default item;
