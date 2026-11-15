import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme-message",
  },
  stimulus: "old-translator",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menerjemahkan juga berarti memutuskan apa yang dibagikan kepada orang lain, sejalan dengan keterangan bahwa memilih satu padanan berarti membuang yang lain.",
        },
        {
          correct: false,
          label:
            "Menerjemahkan juga berarti memutuskan apa yang dibagikan kepada orang lain, sejalan dengan keterangan bahwa Dita menemukan surat-surat itu di kaleng biskuit.",
        },
        {
          correct: false,
          label:
            "Pak Sastro sudah lelah menerjemahkan, sejalan dengan keterangan bahwa ia bekerja sebagai penerjemah selama empat puluh tahun.",
        },
        {
          correct: false,
          label:
            "Surat terakhir ditulis dalam bahasa yang tidak dikuasai Pak Sastro, sejalan dengan keterangan bahwa surat-surat itu ditulis dalam bahasa Jawa.",
        },
        {
          correct: false,
          label:
            "Pak Sastro marah kepada Dita, sejalan dengan keterangan bahwa ia melepas kacamatanya ketika Dita mengusulkan kata sukses.",
        },
      ],
    },
  },
};

export default item;
