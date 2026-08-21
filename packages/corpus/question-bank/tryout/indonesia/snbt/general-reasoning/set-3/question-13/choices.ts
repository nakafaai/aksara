import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Das Geschäft verkauft $$24$$ Bergo-Tücher.",
      value: false,
    },
    {
      label:
        "Pashmina ist mit $$35$$ verkauften Tüchern das meistverkaufte Modell.",
      value: false,
    },
    {
      label: "Das Geschäft verkauft $$42$$ quadratische Tücher.",
      value: true,
    },
    {
      label: "Es werden weniger Pashmina- als Bergo-Tücher verkauft.",
      value: false,
    },
    {
      label: "Bergo ist das meistverkaufte Kopftuchmodell.",
      value: false,
    },
  ],
  en: [
    {
      label: "The shop sells $$24$$ bergo headscarves.",
      value: false,
    },
    {
      label:
        "Pashmina is the best-selling style, with $$35$$ headscarves sold.",
      value: false,
    },
    {
      label: "The shop sells $$42$$ square headscarves.",
      value: true,
    },
    {
      label: "The shop sells fewer pashmina than bergo headscarves.",
      value: false,
    },
    {
      label: "Bergo is the best-selling headscarf style.",
      value: false,
    },
  ],
  id: [
    {
      label: "Banyak kerudung jenis bergo yang terjual adalah $$24$$ buah.",
      value: false,
    },
    {
      label:
        "Kerudung jenis pasmina paling banyak terjual yaitu sebesar $$35$$ buah.",
      value: false,
    },
    {
      label: "Penjualan jenis kerudung segiempat adalah sebanyak $$42$$ buah.",
      value: true,
    },
    {
      label:
        "Kerudung jenis pasmina lebih sedikit terjual dibandingkan kerudung jenis bergo.",
      value: false,
    },
    {
      label: "Kerudung jenis bergo adalah kerudung yang paling banyak terjual.",
      value: false,
    },
  ],
};

export default choices;
