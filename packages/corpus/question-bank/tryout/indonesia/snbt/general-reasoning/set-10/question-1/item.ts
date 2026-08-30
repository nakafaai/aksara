import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Entwaldung kann Böden anfälliger für Erosion machen",
        },
        {
          isCorrect: false,
          label:
            "Von der Abholzung betroffen sind auch Gemeinden, die Brennholz nutzen",
        },
        {
          isCorrect: false,
          label: "Entwaldung bedroht die Lebensräume von Wildtieren",
        },
        {
          isCorrect: false,
          label: "Der Landnutzungssektor umfasst mehr als nur Entwaldung",
        },
        {
          isCorrect: true,
          label:
            "Entwaldung allein verursachte 2019 fast alle vom Menschen verursachten Treibhausgasemissionen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Deforestation can make soil more vulnerable to erosion",
        },
        {
          isCorrect: false,
          label:
            "Communities that use firewood are among those affected by deforestation",
        },
        {
          isCorrect: false,
          label: "Deforestation threatens wildlife habitats",
        },
        {
          isCorrect: false,
          label: "The land-use sector includes more than deforestation alone",
        },
        {
          isCorrect: true,
          label:
            "Deforestation alone produced almost all human-caused greenhouse gas emissions in 2019",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Deforestasi dapat membuat tanah lebih rentan terhadap erosi",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat yang menggunakan kayu bakar menjadi salah satu yang terdampak deforestasi",
        },
        {
          isCorrect: false,
          label: "Deforestasi mengancam habitat satwa liar",
        },
        {
          isCorrect: false,
          label: "Sektor penggunaan lahan mencakup lebih dari deforestasi saja",
        },
        {
          isCorrect: true,
          label:
            "Deforestasi saja menghasilkan hampir seluruh emisi gas rumah kaca akibat aktivitas manusia pada 2019",
        },
      ],
    },
  },
};

export default item;
