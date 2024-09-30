import React from "react";
import "../css/EducationalResources.css"; // Assuming you have a CSS file for styling

const EducationalResources: React.FC = () => {
  return (
    <div className="educational-resources-container">
      {/* Navbar for navigation */}
      <nav className="navbar">
        <ul>
          <li>
            <a href="#gases">Greenhouse Gases</a>
          </li>
          <li>
            <a href="#causes">Causes of Climate Change</a>
          </li>
          <li>
            <a href="#fightback">How to Fight Climate Change</a>
          </li>
          <li>
            <a href="#treeplantation">Tree Plantation</a>
          </li>
        </ul>
      </nav>

      {/* Section 1: Greenhouse Gases */}
      <section id="gases" className="content-section">
        <h2>Greenhouse Gases</h2>
        <p>
          Greenhouse gases trap heat in the Earth's atmosphere, contributing to
          global warming and climate change. The most common greenhouse gases
          are carbon dioxide (CO<sub>2</sub>), methane (CH<sub>4</sub>), nitrous
          oxide (N<sub>2</sub>O), and fluorinated gases.
        </p>
        <ul>
          <li>
            <strong>
              Carbon Dioxide (CO<sub>2</sub>):
            </strong>{" "}
            Mainly produced from burning fossil fuels like coal, oil, and gas.
          </li>
          <li>
            <strong>
              Methane (CH<sub>4</sub>):
            </strong>{" "}
            Emitted during the production and transport of coal, oil, and
            natural gas.
          </li>
          <li>
            <strong>
              Nitrous Oxide (N<sub>2</sub>O):
            </strong>{" "}
            Released from agricultural and industrial activities, as well as
            combustion of fossil fuels.
          </li>
        </ul>
      </section>

      {/* Section 2: Causes of Climate Change */}
      <section id="causes" className="content-section">
        <h2>Causes of Climate Change</h2>
        <p>
          The primary cause of climate change is human activity, particularly
          the burning of fossil fuels, which increases concentrations of
          greenhouse gases in the atmosphere. Other causes include deforestation
          and certain agricultural practices.
        </p>
        <ul>
          <li>
            <strong>Fossil Fuels:</strong> Burning coal, oil, and natural gas
            for energy releases large amounts of CO<sub>2</sub>.
          </li>
          <li>
            <strong>Deforestation:</strong> Cutting down forests reduces the
            amount of CO<sub>2</sub> absorbed from the atmosphere.
          </li>
          <li>
            <strong>Agriculture:</strong> Methane emissions from livestock and
            fertilizers contribute to greenhouse gases.
          </li>
        </ul>
      </section>

      {/* Section 3: How to Fight Climate Change */}
      <section id="fightback" className="content-section">
        <h2>How to Fight Climate Change</h2>
        <p>
          There are many ways we can all fight climate change. Reducing your
          carbon footprint, conserving energy, supporting renewable energy, and
          making sustainable lifestyle choices can make a big difference.
        </p>
        <ul>
          <li>
            <strong>Use Renewable Energy:</strong> Switch to solar, wind, or
            hydropower to reduce reliance on fossil fuels.
          </li>
          <li>
            <strong>Reduce Carbon Footprint:</strong> Carpool, use public
            transportation, or cycle to reduce emissions.
          </li>
          <li>
            <strong>Conserve Energy:</strong> Turn off lights, unplug
            electronics, and opt for energy-efficient appliances.
          </li>
        </ul>
      </section>

      {/* Section 4: Tree Plantation */}
      <section id="treeplantation" className="content-section">
        <h2>Tree Plantation</h2>
        <p>
          Planting trees is one of the simplest and most effective ways to
          combat climate change. Trees absorb carbon dioxide, release oxygen,
          and help maintain ecological balance.
        </p>
        <ul>
          <li>
            <strong>Reforestation:</strong> Replanting forests that have been
            cut down or destroyed.
          </li>
          <li>
            <strong>Afforestation:</strong> Planting trees in areas that have
            never been forested.
          </li>
          <li>
            <strong>Urban Tree Planting:</strong> Planting trees in cities to
            improve air quality and reduce heat islands.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default EducationalResources;
