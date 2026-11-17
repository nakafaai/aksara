import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on cells, chapters 1 to 7 of the DSKP. */
export const kssmForm4BiologyTopicNodes = [
  unitNode({
    key: "form-4-biology-introduction-to-biology-and-laboratory-rules",
    order: 10,
    translations: {
      de: {
        routeSlug: "einfuehrung-in-die-biologie-und-laborregeln",
        title: "Einführung in die Biologie und Laborregeln",
      },
      en: {
        routeSlug: "introduction-to-biology-and-laboratory-rules",
        title: "Introduction to Biology and Laboratory Rules",
      },
      id: {
        routeSlug: "pengantar-biologi-dan-tata-tertib-laboratorium",
        title: "Pengantar Biologi dan Tata Tertib Laboratorium",
      },
      ms: {
        routeSlug: "pengenalan-kepada-biologi-dan-peraturan-makmal",
        title: "Pengenalan kepada Biologi dan Peraturan Makmal",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cell-biology-and-cell-organisation-cell-organisation",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-organisation"],
        order: 10,
      }),
    ],
    key: "form-4-biology-cell-biology-and-cell-organisation",
    materialCard: {
      de: {
        description: "Erkenne Organellen und spezialisierte Zellen.",
        title: "Zellbiologie und Zellorganisation",
      },
      en: {
        description: "Identify organelles and specialised cells.",
        title: "Cell Biology and Cell Organisation",
      },
      id: {
        description: "Kenali organel dan sel khusus.",
        title: "Biologi Sel dan Organisasi Sel",
      },
      ms: {
        description: "Kenal pasti organel dan sel khusus.",
        title: "Biologi Sel dan Organisasi Sel",
      },
    },
    order: 20,
    translations: {
      de: {
        routeSlug: "zellbiologie-und-zellorganisation",
        title: "Zellbiologie und Zellorganisation",
      },
      en: {
        routeSlug: "cell-biology-and-cell-organisation",
        title: "Cell Biology and Cell Organisation",
      },
      id: {
        routeSlug: "biologi-sel-dan-organisasi-sel",
        title: "Biologi Sel dan Organisasi Sel",
      },
      ms: {
        routeSlug: "biologi-sel-dan-organisasi-sel",
        title: "Biologi Sel dan Organisasi Sel",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-movement-of-substances-across-a-plasma-membrane-membrane-transport",
        level: "lesson",
        materialKeys: ["lesson.biology.membrane-transport"],
        order: 10,
      }),
    ],
    key: "form-4-biology-movement-of-substances-across-a-plasma-membrane",
    materialCard: {
      de: {
        description: "Unterscheide Diffusion, Osmose und aktiven Transport.",
        title: "Stofftransport durch die Plasmamembran",
      },
      en: {
        description: "Tell diffusion, osmosis and active transport apart.",
        title: "Movement of Substances across a Plasma Membrane",
      },
      id: {
        description: "Bedakan difusi, osmosis, dan transpor aktif.",
        title: "Transpor Zat melalui Membran Plasma",
      },
      ms: {
        description: "Bezakan resapan, osmosis dan pengangkutan aktif.",
        title: "Pergerakan Bahan Merentas Membran Plasma",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "stofftransport-durch-die-plasmamembran",
        title: "Stofftransport durch die Plasmamembran",
      },
      en: {
        routeSlug: "movement-of-substances-across-a-plasma-membrane",
        title: "Movement of Substances across a Plasma Membrane",
      },
      id: {
        routeSlug: "transpor-zat-melalui-membran-plasma",
        title: "Transpor Zat melalui Membran Plasma",
      },
      ms: {
        routeSlug: "pergerakan-bahan-merentasi-membran-plasma",
        title: "Pergerakan Bahan Merentasi Membran Plasma",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-chemical-composition-in-a-cell-cell-chemistry",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-chemistry"],
        order: 10,
      }),
    ],
    key: "form-4-biology-chemical-composition-in-a-cell",
    materialCard: {
      de: {
        description: "Wasser, Kohlenhydrate, Proteine, Lipide, Nukleinsäuren.",
        title: "Chemie der Zelle",
      },
      en: {
        description: "Water, carbohydrates, proteins, lipids, nucleic acids.",
        title: "Cell Chemistry",
      },
      id: {
        description: "Air, karbohidrat, protein, lipid, dan asam nukleat.",
        title: "Kimia Sel",
      },
      ms: {
        description: "Air, karbohidrat, protein, lipid dan asid nukleik.",
        title: "Kimia Sel",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "chemische-zusammensetzung-der-zelle",
        title: "Chemische Zusammensetzung der Zelle",
      },
      en: {
        routeSlug: "chemical-composition-in-a-cell",
        title: "Chemical Composition in a Cell",
      },
      id: {
        routeSlug: "komposisi-kimia-dalam-sel",
        title: "Komposisi Kimia dalam Sel",
      },
      ms: {
        routeSlug: "komposisi-kimia-dalam-sel",
        title: "Komposisi Kimia dalam Sel",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-metabolism-and-enzymes-metabolism-enzyme",
        level: "lesson",
        materialKeys: ["lesson.biology.metabolism-enzyme"],
        order: 10,
      }),
    ],
    key: "form-4-biology-metabolism-and-enzymes",
    materialCard: {
      de: {
        description: "Erkläre, wie Enzyme den Stoffwechsel beschleunigen.",
        title: "Stoffwechsel und Enzyme",
      },
      en: {
        description: "Explain metabolism and how enzymes speed up reactions.",
        title: "Metabolism and Enzymes",
      },
      id: {
        description: "Jelaskan metabolisme dan cara enzim mempercepat reaksi.",
        title: "Metabolisme dan Enzim",
      },
      ms: {
        description: "Terangkan metabolisme dan cara enzim bertindak.",
        title: "Metabolisme dan Enzim",
      },
    },
    order: 50,
    translations: {
      de: {
        routeSlug: "stoffwechsel-und-enzyme",
        title: "Stoffwechsel und Enzyme",
      },
      en: {
        routeSlug: "metabolism-and-enzymes",
        title: "Metabolism and Enzymes",
      },
      id: {
        routeSlug: "metabolisme-dan-enzim",
        title: "Metabolisme dan Enzim",
      },
      ms: {
        routeSlug: "metabolisme-dan-enzim",
        title: "Metabolisme dan Enzim",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cell-division-cell-division",
        level: "lesson",
        materialKeys: ["lesson.biology.cell-division"],
        order: 10,
      }),
    ],
    key: "form-4-biology-cell-division",
    materialCard: {
      de: {
        description: "Vergleiche Mitose und Meiose im Zellzyklus.",
        title: "Zellteilung",
      },
      en: {
        description: "Compare mitosis and meiosis and follow the cell cycle.",
        title: "Cell Division",
      },
      id: {
        description: "Bandingkan mitosis dan meiosis serta ikuti siklus sel.",
        title: "Pembelahan Sel",
      },
      ms: {
        description: "Bandingkan mitosis dan meiosis serta ikuti kitar sel.",
        title: "Pembahagian Sel",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "zellteilung", title: "Zellteilung" },
      en: { routeSlug: "cell-division", title: "Cell Division" },
      id: { routeSlug: "pembelahan-sel", title: "Pembelahan Sel" },
      ms: { routeSlug: "pembahagian-sel", title: "Pembahagian Sel" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-cellular-respiration-cellular-respiration",
        level: "lesson",
        materialKeys: ["lesson.biology.cellular-respiration"],
        order: 10,
      }),
    ],
    key: "form-4-biology-cellular-respiration",
    materialCard: {
      de: {
        description: "Vergleiche Zellatmung, Gärung und Sauerstoffschuld.",
        title: "Zellatmung",
      },
      en: {
        description: "Compare respiration, fermentation and oxygen debt.",
        title: "Cellular Respiration",
      },
      id: {
        description: "Bandingkan respirasi, fermentasi, dan utang oksigen.",
        title: "Respirasi Sel",
      },
      ms: {
        description: "Bandingkan respirasi, fermentasi dan hutang oksigen.",
        title: "Respirasi Sel",
      },
    },
    order: 70,
    translations: {
      de: { routeSlug: "zellatmung", title: "Zellatmung" },
      en: { routeSlug: "cellular-respiration", title: "Cellular Respiration" },
      id: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
      ms: { routeSlug: "respirasi-sel", title: "Respirasi Sel" },
    },
  }),
];
