import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pertumbuhan menurun setiap tahun dari $$2013$$ hingga $$2018$$",
        },
        {
          correct: false,
          label:
            "Pertumbuhan tidak pernah menurun antara $$2014$$ dan $$2017$$",
        },
        {
          correct: true,
          label:
            "Tingkat pertumbuhan $$2013$$ lebih tinggi daripada setiap tingkat pada $$2014$$ hingga $$2018$$",
        },
        {
          correct: false,
          label: "Pertumbuhan tidak menunjukkan pemulihan setelah $$2015$$",
        },
        {
          correct: false,
          label:
            "Penurunan dari $$2014$$ ke $$2015$$ lebih besar daripada kenaikan dari $$2015$$ ke $$2016$$",
        },
      ],
    },
  },
};

export default item;
