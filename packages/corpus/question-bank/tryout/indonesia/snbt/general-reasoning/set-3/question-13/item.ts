import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Das Geschäft verkauft $$24$$ Bergo-Tücher.",
        },
        {
          isCorrect: false,
          label:
            "Pashmina ist mit $$35$$ verkauften Tüchern das meistverkaufte Modell.",
        },
        {
          isCorrect: true,
          label: "Das Geschäft verkauft $$42$$ quadratische Tücher.",
        },
        {
          isCorrect: false,
          label: "Es werden weniger Pashmina- als Bergo-Tücher verkauft.",
        },
        {
          isCorrect: false,
          label: "Bergo ist das meistverkaufte Kopftuchmodell.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The shop sells $$24$$ bergo headscarves.",
        },
        {
          isCorrect: false,
          label:
            "Pashmina is the best-selling style, with $$35$$ headscarves sold.",
        },
        {
          isCorrect: true,
          label: "The shop sells $$42$$ square headscarves.",
        },
        {
          isCorrect: false,
          label: "The shop sells fewer pashmina than bergo headscarves.",
        },
        {
          isCorrect: false,
          label: "Bergo is the best-selling headscarf style.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Banyak kerudung jenis bergo yang terjual adalah $$24$$ buah.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis pasmina paling banyak terjual yaitu sebesar $$35$$ buah.",
        },
        {
          isCorrect: true,
          label:
            "Penjualan jenis kerudung segiempat adalah sebanyak $$42$$ buah.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis pasmina lebih sedikit terjual dibandingkan kerudung jenis bergo.",
        },
        {
          isCorrect: false,
          label:
            "Kerudung jenis bergo adalah kerudung yang paling banyak terjual.",
        },
      ],
    },
  },
};

export default item;
