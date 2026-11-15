import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The rate is directly proportional to the acid concentration, as all three results show",
        },
        {
          correct: false,
          label:
            "The effect of concentration is greatest at low concentration, because the time rises most from $$1.0$$ to $$0.5\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "The rate increases as the acid concentration increases, based on the first two results only, because the third result uses a different length of ribbon",
        },
        {
          correct: false,
          label:
            "No conclusion can be drawn because the volume of acid was kept constant",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kadar tindak balas berkadar terus dengan kepekatan asid, seperti yang ditunjukkan oleh ketiga-tiga keputusan",
        },
        {
          correct: false,
          label:
            "Kesan kepekatan paling besar pada kepekatan rendah, kerana masa bertambah paling banyak dari $$1.0$$ kepada $$0.5\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "Kadar tindak balas bertambah apabila kepekatan asid bertambah, berdasarkan dua keputusan pertama sahaja, kerana keputusan ketiga menggunakan panjang pita yang berbeza",
        },
        {
          correct: false,
          label:
            "Tiada kesimpulan boleh dibuat kerana isi padu asid dimalarkan",
        },
      ],
    },
  },
};

export default item;
