import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Entwaldung kann Böden anfälliger für Erosion machen",
      value: false,
    },
    {
      label:
        "Entwaldung allein verursachte 2019 fast alle vom Menschen verursachten Treibhausgasemissionen",
      value: true,
    },
    {
      label:
        "Von der Abholzung betroffen sind auch Gemeinden, die Brennholz nutzen",
      value: false,
    },
    {
      label: "Entwaldung bedroht die Lebensräume von Wildtieren",
      value: false,
    },
    {
      label: "Der Landnutzungssektor umfasst mehr als nur Entwaldung",
      value: false,
    },
  ],
  en: [
    {
      label: "Deforestation can make soil more vulnerable to erosion",
      value: false,
    },
    {
      label:
        "Deforestation alone produced almost all human-caused greenhouse gas emissions in 2019",
      value: true,
    },
    {
      label:
        "Communities that use firewood are among those affected by deforestation",
      value: false,
    },
    {
      label: "Deforestation threatens wildlife habitats",
      value: false,
    },
    {
      label: "The land-use sector includes more than deforestation alone",
      value: false,
    },
  ],
  id: [
    {
      label: "Deforestasi dapat membuat tanah lebih rentan terhadap erosi",
      value: false,
    },
    {
      label:
        "Deforestasi saja menghasilkan hampir seluruh emisi gas rumah kaca akibat aktivitas manusia pada 2019",
      value: true,
    },
    {
      label:
        "Masyarakat yang menggunakan kayu bakar menjadi salah satu yang terdampak deforestasi",
      value: false,
    },
    {
      label: "Deforestasi mengancam habitat satwa liar",
      value: false,
    },
    {
      label: "Sektor penggunaan lahan mencakup lebih dari deforestasi saja",
      value: false,
    },
  ],
};

export default choices;
