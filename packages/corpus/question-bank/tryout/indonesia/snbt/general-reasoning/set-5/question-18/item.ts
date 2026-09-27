import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pertumbuhan menurun setiap tahun dari $$2013$$ hingga $$2018$$",
        },
        {
          isCorrect: false,
          label:
            "Pertumbuhan tidak pernah menurun antara $$2014$$ dan $$2017$$",
        },
        {
          isCorrect: true,
          label:
            "Tingkat pertumbuhan $$2013$$ lebih tinggi daripada setiap tingkat pada $$2014$$ hingga $$2018$$",
        },
        {
          isCorrect: false,
          label: "Pertumbuhan tidak menunjukkan pemulihan setelah $$2015$$",
        },
        {
          isCorrect: false,
          label:
            "Penurunan dari $$2014$$ ke $$2015$$ lebih besar daripada kenaikan dari $$2015$$ ke $$2016$$",
        },
      ],
    },
  },
};

export default item;
