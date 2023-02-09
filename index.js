import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import sqlite from 'better-sqlite3';
import { createStatements } from './sqlStatements.js';
import parseYetf from '@cityssm/mpac-yetf';
const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 -i [inputFile] -o [outputFile]')
    .demandOption(['i', 'o']).argv;
try {
    const inputFile = argv.i;
    if (!fs.existsSync(inputFile)) {
        throw new Error('Input file does not exist: ' + inputFile);
    }
    const outputFile = argv.o;
    if (fs.existsSync(outputFile)) {
        throw new Error('Output file already exists: ' + outputFile);
    }
    const database = sqlite(outputFile);
    for (const createStatement of createStatements) {
        database.prepare(createStatement).run();
    }
    await parseYetf(inputFile, {
        addFormattedFields: true,
        callbacks: {
            all: (record) => {
                console.log(record);
            },
            AA: (record) => {
                database
                    .prepare(`insert into AA (
              rollNumber,
              rollNumberCounty, rollNumberMunicipality,
              rollNumberMapArea, rollNumberMapDivision, rollNumberMapSubdivision,
              rollNumberParcel, rollNumberParcelSub,
              rollNumberPrimarySubordinate,
              ward, poll, pollSuffix,
              highSchoolCode, publicSchoolCode, separateSchoolCode,
              specialRateArea, pacCode,
              previousRollNumber,
              frenchPublicSchoolCode, frenchSeparateSchoolCode)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.rollNumberCounty, record.rollNumberMunicipality, record.rollNumberMapArea, record.rollNumberMapDivision, record.rollNumberMapSubdivision, record.rollNumberParcel, record.rollNumberParcelSub, record.rollNumberPrimarySubordinate, record.ward, record.poll, record.pollSuffix, record.highSchoolCode, record.publicSchoolCode, record.separateSchoolCode, record.specialRateArea, record.pacCode, record.previousRollNumber, record.frenchPublicSchoolCode, record.frenchSeparateSchoolCode);
            },
            BB: (record) => {
                database
                    .prepare(`insert into BB (
              rollNumber,
              frontage, frontageFeet, frontageMetres,
              siteArea, siteAreaSquareFeet, siteAreaAcres,
              unitOfMeasurement,
              depth, depthFeet, depthMetres, farmForestryExemptionAcres,
              siteImprovement,
              siteImprovementHasBoathouse, siteImprovementHasSiteImprovements,
              siteImprovementHasOther, siteImprovementHasAccessibleFacilities,
              siteImprovementHasPool, siteImprovementHasElevator,
              siteImprovementHasSauna, siteImprovementHasMultiple,
              siteImprovementHasTennisCourts,
              propertyCode, propertyCodeClass, propertyCodeName,
              services, servicesName,
              access, accessName)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.frontage, record.frontageFeet, record.frontageMetres, record.siteArea, record.siteAreaSquareFeet, record.siteAreaAcres, record.unitOfMeasurement, record.depth, record.depthFeet, record.depthMetres, record.farmForestryExemptionAcres, record.siteImprovement, record.siteImprovementHasBoathouse ? 1 : 0, record.siteImprovementHasSiteImprovements ? 1 : 0, record.siteImprovementHasOther ? 1 : 0, record.siteImprovementHasAccessibleFacilities ? 1 : 0, record.siteImprovementHasPool ? 1 : 0, record.siteImprovementHasElevator ? 1 : 0, record.siteImprovementHasSauna ? 1 : 0, record.siteImprovementHasMultiple ? 1 : 0, record.siteImprovementHasTennisCourts ? 1 : 0, record.propertyCode, record.propertyCodeClass, record.propertyCodeName, record.services, record.servicesName, record.access, record.accessName);
            },
            CC: (record) => {
                database
                    .prepare(`insert into CC (
              rollNumber, sequenceNumber,
              characterOfConstruction,
              characterOfConstructionDescription,
              characterOfConstructionFramingDescription,
              characterOfConstructionFloorDescription,
              characterOfConstructionRoofDescription,
              characterOfConstructionWallsDescription,
              quality,
              shape,
              yearBuilt, yearBuiltCode, yearBuiltCodeName,
              condition, conditionName, conditionRakingOutOf5,
              fullStoreys, partStoreys, partStoreysName,
              heightEffectiveYearBuilt, heightFeet, effectiveYearBuilt,
              split, splitName,
              grossArea, grossAreaSquareFeet,
              totalBasementArea, totalBasementAreaSquareFeet,
              finishedBasementArea, finishedBasementAreaSquareFeet,
              basementFinish, basementFinishName,
              fullBaths, halfBaths,
              numberOfBedrooms, numberOfFireplaces,
              heatingType, heatingTypeName,
              airConditioning,
              garageType, garageTypeName,
              garageSpaces,
              structureCode, structureCodeClass, structureCodeName)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run();
            }
        }
    });
    database.close();
}
catch (error) {
    console.error(error);
}
