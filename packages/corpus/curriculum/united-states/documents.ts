/**
 * Official US standards the mappings cite: the Common Core State Standards
 * for Mathematics (2010) and the Next Generation Science Standards (2013),
 * whose high school disciplinary core ideas are published per arrangement.
 */

const arrangementHost = "https://www.nextgenscience.org/dci-arrangement";

/** Common Core State Standards for Mathematics, high school conceptual categories. */
export const mathematicsStandards = {
  title: "Common Core State Standards for Mathematics",
  url: "https://corestandards.org/wp-content/uploads/2023/09/Math_Standards1.pdf",
};

/** NGSS HS-PS1 Matter and Its Interactions. */
export const matterStandards = {
  title:
    "Next Generation Science Standards, HS-PS1 Matter and Its Interactions",
  url: `${arrangementHost}/hs-ps1-matter-and-its-interactions`,
};

/** NGSS HS-PS2 Motion and Stability: Forces and Interactions. */
export const forceStandards = {
  title:
    "Next Generation Science Standards, HS-PS2 Motion and Stability: Forces and Interactions",
  url: `${arrangementHost}/hs-ps2-motion-and-stability-forces-and-interactions`,
};

/** NGSS HS-PS3 Energy. */
export const energyStandards = {
  title: "Next Generation Science Standards, HS-PS3 Energy",
  url: `${arrangementHost}/hs-ps3-energy`,
};

/** NGSS HS-LS4 Biological Evolution: Unity and Diversity. */
export const evolutionStandards = {
  title:
    "Next Generation Science Standards, HS-LS4 Biological Evolution: Unity and Diversity",
  url: `${arrangementHost}/hs-ls4-biological-evolution-unity-and-diversity`,
};

/** NGSS HS-ESS3 Earth and Human Activity. */
export const earthActivityStandards = {
  title: "Next Generation Science Standards, HS-ESS3 Earth and Human Activity",
  url: `${arrangementHost}/hs-ess3-earth-and-human-activity`,
};
