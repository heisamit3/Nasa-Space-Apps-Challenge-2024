import React from "react";
import { FaTree, FaFireAlt, FaLeaf, FaGlobe, FaChartPie } from "react-icons/fa"; // Importing icons
import "../css/EducationalResources.css"; // Custom CSS for advanced styles

const EducationalResources: React.FC = () => {
  return (
    <div className="educational-resources-container">
      {/* Navbar for navigation */}
      <nav className="navbar">
        <ul>
          <li>
            <a href="#gases">
              <FaLeaf /> Greenhouse Gases
            </a>
          </li>
          <li>
            <a href="#fossilfuels">
              <FaFireAlt /> Fossil Fuels
            </a>
          </li>
          <li>
            <a href="#carbon">
              <FaGlobe /> CO₂ and CH₄
            </a>
          </li>
          <li>
            <a href="#sourcesandsinks">
              <FaTree /> GHG Sources & Sinks
            </a>
          </li>
          <li>
            <a href="#carbonbudget">
              <FaChartPie /> Carbon Budget
            </a>
          </li>
        </ul>
      </nav>

      {/* Section 1: Greenhouse Gases */}
      <section id="gases" className="content-section">
        <h2>
          <FaLeaf /> Greenhouse Gases (GHGs)
        </h2>
        <p className="intro-text">
          Greenhouse gases (GHGs) trap heat from the Sun, contributing to the
          warming of our planet. These gases act like a blanket, keeping the
          Earth's temperature livable, but too much can lead to climate change.
          The primary GHGs include:
        </p>
        <div className="grid-container">
          <div className="grid-item">
            <h3>Carbon Dioxide (CO₂)</h3>
            <p>
              The most abundant GHG, largely from fossil fuel burning.{" "}
              <a
                href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases"
                target="_blank"
                rel="noreferrer"
              >
                Learn more from EPA
              </a>
            </p>
          </div>
          <div className="grid-item">
            <h3>Methane (CH₄)</h3>
            <p>
              A potent GHG from natural gas production and agriculture.{" "}
              <a
                href="https://www.globalmethane.org/"
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="grid-item">
            <h3>Nitrous Oxide (N₂O)</h3>
            <p>
              Released from fertilizers and combustion processes.{" "}
              <a
                href="https://www.ipcc.ch/srccl/chapter/summary-for-policymakers/"
                target="_blank"
                rel="noreferrer"
              >
                More details from IPCC
              </a>
            </p>
          </div>
        </div>
        <p>
          GHGs cause the greenhouse effect, leading to global warming and
          climate change. Explore the role of GHGs in this{" "}
          <a
            href="https://climate.nasa.gov/causes/"
            target="_blank"
            rel="noreferrer"
          >
            NASA article
          </a>
          .
        </p>
      </section>

      {/* Section 2: Fossil Fuels */}
      <section id="fossilfuels" className="content-section">
        <h2>
          <FaFireAlt /> Fossil Fuels
        </h2>
        <p>
          Fossil fuels are hydrocarbon deposits that can be burned for heat or
          power. The three primary types of fossil fuels are:
        </p>
        <ul>
          <li>
            <strong>Coal</strong>
          </li>
          <li>
            <strong>Oil</strong>
          </li>
          <li>
            <strong>Natural Gas</strong>
          </li>
        </ul>
        <p>
          These fuels release carbon dioxide and other GHGs into the atmosphere,
          contributing significantly to global warming. For an in-depth
          explanation of fossil fuels and their environmental impact, check out
          this{" "}
          <a
            href="https://www.nationalgeographic.org/encyclopedia/fossil-fuels/"
            target="_blank"
            rel="noreferrer"
          >
            National Geographic article
          </a>
          .
        </p>
      </section>

      {/* Section 3: CO₂ and Methane */}
      <section id="carbon" className="content-section">
        <h2>
          <FaGlobe /> CO₂ and Methane (CH₄)
        </h2>
        <p>
          <strong>Carbon Dioxide (CO₂):</strong> CO₂ is the primary GHG
          contributing to climate change. It is released by burning fossil fuels
          and is responsible for approximately 76% of global emissions. More on
          CO₂:{" "}
          <a
            href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases"
            target="_blank"
            rel="noreferrer"
          >
            EPA’s CO₂ overview
          </a>
          .
        </p>
        <p>
          <strong>Methane (CH₄):</strong> CH₄ is about 25 times more effective
          than CO₂ at trapping heat over a 100-year period, though it is less
          prevalent in the atmosphere. Human activities, such as livestock
          farming and oil extraction, significantly contribute to methane
          emissions.{" "}
          <a
            href="https://www.globalmethane.org/about/index.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Explore methane’s role
          </a>
          .
        </p>
      </section>

      {/* Section 4: GHG Sources and Sinks */}
      <section id="sourcesandsinks" className="content-section">
        <h2>
          <FaTree /> GHG Sources and Sinks
        </h2>
        <p>
          A <strong>GHG source</strong> is any process that releases greenhouse
          gases into the atmosphere. For instance, the burning of fossil fuels
          releases large quantities of CO₂.
        </p>
        <p>
          A <strong>GHG sink</strong> is something that absorbs and stores GHGs
          from the atmosphere, such as forests and oceans. Trees, through
          photosynthesis, are vital carbon sinks.
        </p>
        <p>
          Learn more about GHG sources and sinks at{" "}
          <a
            href="https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions"
            target="_blank"
            rel="noreferrer"
          >
            EPA’s GHG sources and sinks
          </a>
          .
        </p>
      </section>

      {/* Section 5: Carbon Budget */}
      <section id="carbonbudget" className="content-section">
        <h2>
          <FaChartPie /> Carbon Budget
        </h2>
        <p>
          The <strong>Global Carbon Budget</strong> tracks the balance between
          GHG emissions and the planet’s capacity to absorb them. The total
          carbon budget refers to the maximum amount of CO₂ we can emit while
          still limiting global warming to 1.5°C or 2°C. To stay within this
          limit, we must rapidly reduce emissions.{" "}
          <a
            href="https://www.globalcarbonproject.org/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about global carbon budgeting
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default EducationalResources;
