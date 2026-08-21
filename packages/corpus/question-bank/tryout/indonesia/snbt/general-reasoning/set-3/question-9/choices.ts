import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Die Beendigung des illegalen Zinnabbaus würde das Wassereinzugsgebiet zwangsläufig schädigen.",
      value: false,
    },
    {
      label:
        "Bergbausedimente und unterbrochene Flussläufe können die Aufnahmekapazität verringern und die Hochwassergefahr in der Regenzeit erhöhen.",
      value: true,
    },
    {
      label:
        "Weil illegale Bergleute offen arbeiten, kann es in der Regenzeit nicht zu Hochwasser kommen.",
      value: false,
    },
    {
      label:
        "Schäden am Wassereinzugsgebiet und Bergbausedimente bedrohen die umliegende Bevölkerung nicht.",
      value: false,
    },
    {
      label:
        "Bergbausedimente verbessern den Abfluss und verhindern Unterbrechungen der Flussläufe.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Stopping illegal tin mining would necessarily damage the watershed.",
      value: false,
    },
    {
      label:
        "Mining-related sedimentation and disrupted channels can reduce river capacity and increase rainy-season flood risk.",
      value: true,
    },
    {
      label:
        "Because illegal miners operate openly, flooding cannot occur during the rainy season.",
      value: false,
    },
    {
      label:
        "Watershed damage and mining sedimentation do not threaten nearby communities.",
      value: false,
    },
    {
      label:
        "Mining sediment improves river flow and prevents channels from being disrupted.",
      value: false,
    },
  ],
  id: [
    {
      label: "Penghentian tambang timah ilegal pasti akan merusak DAS.",
      value: false,
    },
    {
      label:
        "Sedimentasi tambang dan alur yang terganggu dapat mengurangi kapasitas sungai serta meningkatkan risiko banjir pada musim hujan.",
      value: true,
    },
    {
      label:
        "Karena penambang ilegal beroperasi secara terbuka, banjir tidak mungkin terjadi pada musim hujan.",
      value: false,
    },
    {
      label:
        "Kerusakan DAS dan sedimentasi tambang tidak mengancam masyarakat di sekitarnya.",
      value: false,
    },
    {
      label:
        "Sedimentasi tambang memperbaiki aliran sungai dan mencegah alurnya terganggu.",
      value: false,
    },
  ],
};

export default choices;
