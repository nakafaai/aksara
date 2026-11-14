import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "fansur",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Para penyadap menampung getah karet dalam mangkuk kecil yang dipasang di batang pohon.",
        },
        {
          correct: false,
          label:
            "Pengepul di desa itu menampung rotan dari para pencari di hutan sebelum menjualnya ke pabrik mebel.",
        },
        {
          correct: false,
          label:
            "Tempat pelelangan ikan itu menampung hasil tangkapan nelayan dari beberapa pulau kecil di sekitarnya.",
        },
        {
          correct: false,
          label:
            "Menjelang panen raya, gudang koperasi menampung gabah dari petani di tiga kecamatan.",
        },
        {
          correct: false,
          label:
            "Pelabuhan kecil itu tidak sanggup lagi menampung kopra dari pulau-pulau di sekitarnya.",
        },
      ],
    },
  },
};

export default item;
