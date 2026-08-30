import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der GKP-Erzeugerpreis sinkt von Jahr zu Jahr weiter",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Regierung muss den Ankaufspreis erhöhen und den Landwirten zusätzliche Hilfen gewähren",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die zuständigen Stellen müssen die Präsidialverordnung Nr. ",
            },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " von " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: " zur bargeldlosen Sozialhilfe überarbeiten",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Eine schwächere Preisstabilisierung auf Erzeugerebene verringert Kaufkraft und Lebensstandard der Landwirte",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Zahl der Rohreisverkäufe in " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Provinzen sank im April " },
            { display: "block", kind: "math", math: "2019" },
            { kind: "text", text: " um " },
            { display: "block", kind: "math", math: "5{,}37\\%" },
            {
              kind: "text",
              text: ", während Grundnahrungsmittel teurer wurden",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The price of grain, GKP (dry harvested grain), at the farmer level continues to decline from year to year",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The government is forced to increase the purchase price of farmers' grain and provide assistance to farmers",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Related parties must revise Presidential Regulation Number ",
            },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " of " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: " regarding Non-Cash Social Assistance Distribution",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Weaker price stabilization at the farmer level erodes farmers' purchasing power and welfare",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Grain sales transactions in " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " provinces during April " },
            { display: "block", kind: "math", math: "2019" },
            { kind: "text", text: " fell " },
            { display: "block", kind: "math", math: "5.37\\%" },
            {
              kind: "text",
              text: ", in stark contrast to the increase in prices of basic needs",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Harga gabah, GKP (gabah kering panen), di tingkat petani terus mengalami penurunan dari tahun ke tahun",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pemerintah terpaksa menaikkan harga pembelian gabah petani dan memberikan bantuan pada petani",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pihak terkait harus merevisi Peraturan Presiden Nomor ",
            },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " Tahun " },
            { display: "block", kind: "math", math: "2017" },
            {
              kind: "text",
              text: " tentang Penyaluran Bantuan Sosial secara Nontunai",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Melemahnya stabilisasi harga di tingkat petani menggerus daya beli dan kesejahteraan petani",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Transaksi penjualan gabah di " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " provinsi selama April " },
            { display: "block", kind: "math", math: "2019" },
            { kind: "text", text: " turun " },
            { display: "block", kind: "math", math: "5{,}37\\%" },
            {
              kind: "text",
              text: " sangat kontras dengan kenaikan harga kebutuhan",
            },
          ],
        },
      ],
    },
  },
};

export default item;
