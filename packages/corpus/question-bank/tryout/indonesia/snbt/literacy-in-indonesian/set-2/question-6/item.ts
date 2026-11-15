import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Kepergian Laras tidak akan memutus ikatan mereka, seperti benang emas yang tidak putus ketika ditarik." },
        { correct: false, label: "Ibu ingin Laras membawa benang emas ke Bandung, agar benang itu tidak rusak karena tidak dipakai." },
        { correct: false, label: "Laras harus segera pulang, karena ikatan yang terlalu lama ditinggalkan akan rusak seperti benang." },
        { correct: true, label: "Menahan Laras di rumah justru dapat menyia-nyiakan dirinya, seperti benang yang disimpan dan tidak dipakai." },
        { correct: false, label: "Ibu kecewa dengan pilihan Laras, karena ikatan mereka akan putus seperti benang yang ditarik." },
      ],
    },
  },
};

export default item;
