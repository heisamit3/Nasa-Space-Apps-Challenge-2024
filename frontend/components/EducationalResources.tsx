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
          Greenhouse gases (GHGs) are gases in the atmosphere that trap heat
          from the Sun. They contribute to global warming and climate change.
          The primary GHGs include:
        </p>
        <div className="grid-container">
          <div className="grid-item">
            <h3>Carbon Dioxide (CO₂)</h3>
            <p>
              CO₂ is a naturally occurring gas but also a byproduct of burning
              fossil fuels. It is the main gas contributing to climate change.{" "}
              <a
                href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases"
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="grid-item">
            <h3>Methane (CH₄)</h3>
            <p>
              CH₄ is a potent GHG from natural gas and agriculture activities.
              It traps heat more effectively than CO₂.{" "}
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
              Released from fertilizers and combustion processes, N₂O is a
              significant GHG.{" "}
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
      </section>

      {/* Section 2: Fossil Fuels */}
      <section id="fossilfuels" className="content-section">
        <h2>
          <FaFireAlt /> Fossil Fuels
        </h2>
        <p>
          Fossil fuels are hydrocarbon deposits that can be burned for heat or
          power, such as petroleum, coal, and natural gas. These fuels release
          CO₂ and other GHGs into the atmosphere, contributing to global
          warming.
        </p>
        <ul className="styled-list">
          <li>
            <strong>Coal:</strong> A major source of energy and emissions.
          </li>
          <li>
            <strong>Oil:</strong> Used for transportation and industry.
          </li>
          <li>
            <strong>Natural Gas:</strong> A cleaner fossil fuel, but still emits
            CH₄.
          </li>
        </ul>
        <p>
          For more information about fossil fuels and their impact on the
          environment, check out this{" "}
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
          <strong>Carbon Dioxide (CO₂):</strong> The main GHG causing climate
          change, released by burning fossil fuels. Responsible for 76% of
          global emissions.
          <a
            href="https://www.epa.gov/ghgemissions/overview-greenhouse-gases"
            target="_blank"
            rel="noreferrer"
          >
            More details
          </a>
        </p>
        <p>
          <strong>Methane (CH₄):</strong> A GHG 25 times more effective than CO₂
          at trapping heat. Produced by human activities like livestock farming
          and the oil industry.{" "}
          <a
            href="https://www.globalmethane.org/about/index.aspx"
            target="_blank"
            rel="noreferrer"
          >
            Learn about methane
          </a>
        </p>
      </section>

      {/* Section 4: GHG Sources and Sinks */}
      <section id="sourcesandsinks" className="content-section">
        <h2>
          <FaTree /> GHG Sources and Sinks
        </h2>
        <p>
          A <strong>GHG source</strong> is anything that releases GHGs into the
          atmosphere, such as fossil fuel burning. A <strong>GHG sink</strong>{" "}
          removes GHGs, such as plants that absorb CO₂ during photosynthesis.
        </p>
        <p>
          Learn more about GHG sources and sinks in this{" "}
          <a
            href="https://www.epa.gov/ghgemissions/sources-greenhouse-gas-emissions"
            target="_blank"
            rel="noreferrer"
          >
            EPA guide
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
          The <strong>global carbon budget</strong> is the balance between GHG
          emissions and the planet’s ability to absorb them. The{" "}
          <strong>total carbon budget</strong> refers to the maximum amount of
          CO₂ we can emit while still limiting global warming to 1.5°C or 2°C.
        </p>
        <p>
          To stay within this budget, we need to reduce emissions rapidly.{" "}
          <a
            href="https://www.globalcarbonproject.org/"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about the global carbon budget
          </a>
        </p>
      </section>
    </div>
  );
};

export default EducationalResources;
