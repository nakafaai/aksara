import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Der GKP-Erzeugerpreis sinkt von Jahr zu Jahr weiter",
        },
        {
          isCorrect: false,
          label:
            "Die Regierung muss den Ankaufspreis erhöhen und den Landwirten zusätzliche Hilfen gewähren",
        },
        {
          isCorrect: false,
          label:
            "Die zuständigen Stellen müssen die Präsidialverordnung Nr. $$63$$ von $$2017$$ zur bargeldlosen Sozialhilfe überarbeiten",
        },
        {
          isCorrect: true,
          label:
            "Eine schwächere Preisstabilisierung auf Erzeugerebene verringert Kaufkraft und Lebensstandard der Landwirte",
        },
        {
          isCorrect: false,
          label:
            "Die Zahl der Rohreisverkäufe in $$30$$ Provinzen sank im April $$2019$$ um $$5{,}37\\%$$, während Grundnahrungsmittel teurer wurden",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The price of grain, GKP (dry harvested grain), at the farmer level continues to decline from year to year",
        },
        {
          isCorrect: false,
          label:
            "The government is forced to increase the purchase price of farmers' grain and provide assistance to farmers",
        },
        {
          isCorrect: false,
          label:
            "Related parties must revise Presidential Regulation Number $$63$$ of $$2017$$ regarding Non-Cash Social Assistance Distribution",
        },
        {
          isCorrect: true,
          label:
            "Weaker price stabilization at the farmer level erodes farmers' purchasing power and welfare",
        },
        {
          isCorrect: false,
          label:
            "Grain sales transactions in $$30$$ provinces during April $$2019$$ fell $$5.37\\%$$, in stark contrast to the increase in prices of basic needs",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Harga gabah, GKP (gabah kering panen), di tingkat petani terus mengalami penurunan dari tahun ke tahun",
        },
        {
          isCorrect: false,
          label:
            "Pemerintah terpaksa menaikkan harga pembelian gabah petani dan memberikan bantuan pada petani",
        },
        {
          isCorrect: false,
          label:
            "Pihak terkait harus merevisi Peraturan Presiden Nomor $$63$$ Tahun $$2017$$ tentang Penyaluran Bantuan Sosial secara Nontunai",
        },
        {
          isCorrect: true,
          label:
            "Melemahnya stabilisasi harga di tingkat petani menggerus daya beli dan kesejahteraan petani",
        },
        {
          isCorrect: false,
          label:
            "Transaksi penjualan gabah di $$30$$ provinsi selama April $$2019$$ turun $$5{,}37\\%$$ sangat kontras dengan kenaikan harga kebutuhan",
        },
      ],
    },
  },
};

export default item;
