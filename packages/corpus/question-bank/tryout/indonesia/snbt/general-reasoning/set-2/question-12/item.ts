import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Pflanz- oder Rendengsaison der Landwirte wird ungewiss und den Landwirten mangelt es an Saatgut und Dünger",
        },
        {
          isCorrect: false,
          label:
            "Die Umsetzung der Reisbeschaffung wird zunehmend suboptimal und die Regierung ist gezwungen, Reis zu importieren",
        },
        {
          isCorrect: true,
          label:
            "Die staatlichen Reisvorräte oder CBP (staatliche Reisreserven) drohen zurückzugehen",
        },
        {
          isCorrect: false,
          label:
            "Der Lebensmittelverteilungsmechanismus für Raskin oder Rastra wird auf direkte Transfers umgestellt",
        },
        {
          isCorrect: false,
          label:
            "Der HPP (Government Purchase Price) wird im Vergleich zu den Marktpreisen immer niedriger",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Farmers' planting season or rendeng season becomes uncertain and farmers lack seeds and fertilizer",
        },
        {
          isCorrect: false,
          label:
            "Realization of rice procurement becomes increasingly suboptimal and the government is forced to import rice",
        },
        {
          isCorrect: true,
          label:
            "Government rice stocks or CBP (government rice reserves) will be threatened to decrease",
        },
        {
          isCorrect: false,
          label:
            "The food distribution mechanism for Raskin or Rastra undergoes a change to direct transfers",
        },
        {
          isCorrect: false,
          label:
            "HPP (Government Purchase Price) becomes increasingly lower compared to market prices",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Musim tanam petani atau musim rendeng menjadi tidak menentu serta petani kekurangan bibit dan pupuk",
        },
        {
          isCorrect: false,
          label:
            "Realisasi pengadaan beras semakin tidak optimal dan pemerintah terpaksa melakukan impor beras",
        },
        {
          isCorrect: true,
          label:
            "Stok beras pemerintah atau CBP (cadangan beras pemerintah) akan terancam berkurang",
        },
        {
          isCorrect: false,
          label:
            "Mekanisme penyaluran pangan untuk raskin atau rastra mengalami perubahan menjadi transfer langsung",
        },
        {
          isCorrect: false,
          label:
            "HPP (harga pembelian pemerintah) menjadi semakin rendah dibandingkan dengan harga di pasar",
        },
      ],
    },
  },
};

export default item;
