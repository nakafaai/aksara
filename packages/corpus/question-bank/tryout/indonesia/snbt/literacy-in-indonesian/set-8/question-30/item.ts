import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "tone-attitude",
  },
  stimulus: "letter-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "marah karena ibunya tidak pernah mengirim surat balasan",
        },
        {
          correct: true,
          label: "rindu dan kesepian, tetapi tetap berusaha menenangkan ibunya",
        },
        {
          correct: false,
          label: "bangga karena telah berhasil hidup mewah di kota besar",
        },
        {
          correct: false,
          label:
            "takut karena lampu-lampu kota tidak pernah padam sepanjang malam hari",
        },
        {
          correct: false,
          label: "menyesal karena salah memilih pekerjaan di kota",
        },
      ],
    },
  },
};

export default item;
