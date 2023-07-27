import Papa, { ParseResult } from "papaparse";
import { useEffect, useMemo, useRef, useState } from "react";
import { IpgData } from "@/data/pg";

export default function PopulationGrowth() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [yearFrom, setYearFrom] = useState(2550);
  const [yearTo, setYearTo] = useState(2559);
  const [csvData, setCsvData] = useState(Array<IpgData>);
  const [district, setDistrict] = useState(csvData?.[0]?.name ?? "");
  const [districtData, setDistrictData] = useState<{ [key: string]: number }>();
  const yearRange = useRef([2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559]);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  //Load CSV on Mount
  useEffect(() => {
    const csvFilePath = "/assets/csv/bkk_population_growth(1).csv";
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((data) => {
        const result: ParseResult<IpgData> = Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
        });
        setCsvData(result.data);
      });
  }, []);

  //set default value
  useEffect(() => {
    if (csvData && csvData.length > 0) {
      setDistrict(csvData?.[0]?.name);
      yearRange.current = Object.keys(csvData?.[0])
        .filter((f) => f !== "dcode" && f !== "name")
        .map((m) => parseInt(m));
    }
  }, [csvData]);

  //cascade setting value
  useEffect(() => {
    if (yearFrom > yearTo) {
      const yfIndex = yearRange.current.indexOf(yearFrom);
      yfIndex + 1 === yearRange.current.length ? setYearTo(yearRange.current[yfIndex]) : setYearTo(yearFrom + 1);
    }
    if (district !== "") {
      let districtData = { ...csvData.find((f) => f.name === district) };
      delete districtData.name, delete districtData.dcode;
      const newObj = Object.fromEntries(
        Object.entries(districtData)
          .filter(([k, v]) => parseInt(k) >= yearFrom && parseInt(k) <= yearTo)
          .map(([k, v]) => [k, parseFloat(v)])
      );
      setDistrictData(newObj);
    }
  }, [district, yearFrom, yearTo]);

  const { minValue, maxValue, zeroPoint, plotData } = useMemo(() => {
    {
      if (!districtData) return {};
      let v = [...Object.values(districtData), 0];
      let minValue = Math.min(...v);
      let maxValue = Math.max(...v);

      let vNeg = v.filter((f) => f <= 0);
      let vPos = v.filter((f) => f >= 0);

      let vNegMax = Math.max(...vNeg);
      let vNegMin = Math.min(...vNeg);

      let vPosMax = Math.max(...vPos);
      let vPosMin = Math.min(...vPos);

      let zeroPoint;
      let plotData: { [key: string]: string } = {};

      if (vNeg.length === 0 && vPos.length === 0) return {};
      if (vNeg.length > 0 && vPos.length > 0) {
        zeroPoint = (((0 - minValue) / (maxValue - minValue)) * 100).toFixed(2);

        plotData = Object.fromEntries(
          Object.entries(districtData).map(([k, v]) => [
            k,
            v > 0
              ? (((v - vPosMin) / (vPosMax - vPosMin)) * 100).toFixed(2)
              : "-" + (((v - vNegMax) / (vNegMin - vNegMax)) * 100).toFixed(2),
          ])
        );
      } else if (vPos.length > 0) {
        zeroPoint = 0;
        zeroPoint = 0;
        plotData = Object.fromEntries(
          Object.entries(districtData).map(([k, v]) => [k, (((v - 0) / (vPosMax - 0)) * 100).toFixed(2)])
        );
      } else {
        zeroPoint = 100;
        plotData = Object.fromEntries(
          Object.entries(districtData).map(([k, v]) => [k, (((v - vNegMin) / (0 - vNegMin)) * 100).toFixed(2)])
        );
      }

      return { minValue, maxValue, zeroPoint, plotData };
    }
  }, [districtData]);

  function createBarRow(point: string, raw: string) {
    if (parseFloat(point) < 0) {
      return (
        <>
          <span className="flex justify-end">
            <span className="bg-[#ED2E7C] h-[75%]" style={{ width: `${point.slice(1)}%` }}></span>
          </span>
          <span></span>
        </>
      );
    } else {
      return (
        <>
          <span></span>
          <span className="bg-[#ED2E7C] h-[75%]" style={{ width: `${point}%` }}></span>
        </>
      );
    }
  }
  return (
    <>
      <span className="text-white text-[18px] font-bold my-3 flex-1 w-full">
        การเติบโต {zeroPoint} {yearFrom} {yearTo}
      </span>
      {isHydrated && (
        <>
          <div id="chartFilter" className="flex justify-between w-full">
            <span>
              <label htmlFor="districts" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                เขต
              </label>
              <select id="districts" name="districts" onChange={(e) => setDistrict(e.target.value)}>
                {csvData
                  ?.sort((e) => parseInt(e.dcode))
                  .reverse()
                  .map((e) => {
                    return (
                      <option key={e.dcode} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
              </select>
            </span>
            <section className="flex justify-between gap-6">
              <span>
                <label htmlFor="districts" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                  ตั้งแต่
                </label>
                <select
                  id="yearFrom"
                  name="yearFrom"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(parseInt(e.target.value))}
                >
                  {yearRange.current.map((e) => {
                    return <option value={e}>{"พ.ศ. " + e}</option>;
                  })}
                </select>
              </span>
              <span>
                <label htmlFor="yearTo" className="text-white text-[14px] my-3 flex-1 w-full mr-3">
                  ถึง
                </label>
                <select id="yearTo" name="yearTo" value={yearTo} onChange={(e) => setYearTo(parseInt(e.target.value))}>
                  {yearRange.current
                    .filter((f) => f >= yearFrom)
                    .map((e) => {
                      return <option value={e}>{"พ.ศ. " + e}</option>;
                    })}
                </select>
              </span>
            </section>
          </div>
          <div
            id="chart"
            className="w-full my-3 grid grid-cols-[60px_auto] auto-rows-[15px] [&>*:not(:first-child):not(:nth-child(2))]:border-r border-white"
          >
            <span></span>
            <span className="flex justify-between text-white text-[10px]">
              <span>{minValue + "%"}</span>
              <span>{maxValue + "%"}</span>
            </span>
            {districtData &&
              plotData &&
              Object.entries(districtData).map(([year, percent]) => {
                return (
                  <>
                    <span className="text-[10px] text-white">{year}</span>
                    <span className={"grid"} style={{ gridTemplateColumns: `${zeroPoint}% auto` }}>
                      {createBarRow(plotData[year], String(districtData[year]))}
                    </span>
                  </>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
