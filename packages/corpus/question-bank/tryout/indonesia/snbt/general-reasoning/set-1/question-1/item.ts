import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "tambak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kincir membuat kematian udang lebih tinggi, karena pada siklus terakhir rata-rata kematian seluruh petak berkincir lebih tinggi daripada rata-rata kematian seluruh petak tanpa kincir.",
        },
        {
          correct: false,
          label:
            "Kincir tidak berpengaruh terhadap kematian udang, karena rata-rata kematian kedua kelompok sama-sama naik $$7$$ poin persen.",
        },
        {
          correct: true,
          label:
            "Pada padat tebar tinggi, kematian petak berkincir naik $$8$$ poin persen lebih sedikit daripada kematian petak tanpa kincir, sedangkan pada padat tebar rendah kenaikan kedua kelompok sama.",
        },
        {
          correct: false,
          label:
            "Pada padat tebar tinggi, kincir menurunkan kematian sebesar $$12$$ poin persen, karena pada siklus terakhir petak berkincir mencatat $$30\\%$$, sedangkan petak tanpa kincir mencatat $$42\\%$$.",
        },
        {
          correct: false,
          label:
            "Kincir menahan kenaikan kematian pada kedua padat tebar, karena kematian petak berkincir berpadat tebar rendah hanya naik $$4$$ poin persen.",
        },
      ],
    },
  },
};

export default item;
