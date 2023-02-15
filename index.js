import fs from 'node:fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import sqlite from 'better-sqlite3';
import { createStatements } from './sqlStatements.js';
import { parseYetf } from '@cityssm/mpac-yetf';
const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 --inputFile [inputFile] --outputFile [outputFile]')
    .command('--inputFile [inputFile] --outputFile [outputFile]', 'Process the MPAC YETF', (yargs) => {
    return yargs
        .positional('inputFile', {
        describe: 'Path to the MPAC YETF text file.'
    })
        .positional('outputFile', {
        describe: 'Path to the output SQLite database file'
    });
})
    .option('inputFile', {
    type: 'string',
    description: 'Path to the MPAC YETF text file'
})
    .option('outputFile', {
    type: 'string',
    description: 'Path to the output SQLite database file'
})
    .demandOption(['inputFile', 'outputFile']).argv;
try {
    const inputFile = argv.inputFile;
    if (!fs.existsSync(inputFile)) {
        throw new Error('Input file does not exist: ' + inputFile);
    }
    const outputFile = argv.outputFile;
    if (fs.existsSync(outputFile)) {
        throw new Error('Output file already exists: ' + outputFile);
    }
    const database = sqlite(outputFile);
    for (const createStatement of createStatements) {
        database.prepare(createStatement).run();
    }
    let lineNumber = 0;
    await parseYetf(inputFile, {
        addFormattedFields: true,
        callbacks: {
            all: (record) => {
                lineNumber += 1;
                if (lineNumber % 1000 === 0) {
                    console.log(`Processing line ${lineNumber}...`);
                }
            },
            AA: (record) => {
                database
                    .prepare(`insert into AA (
              rollNumber,
              rollNumberCounty, rollNumberMunicipality,
              rollNumberMapArea, rollNumberMapDivision, rollNumberMapSubdivision,
              rollNumberParcel, rollNumberParcelSub,
              rollNumberPrimarySubordinate,
              rollNumberMunicipalityName,
              ward, poll, pollSuffix,
              highSchoolCode, publicSchoolCode, separateSchoolCode,
              specialRateArea, pacCode,
              previousRollNumber,
              frenchPublicSchoolCode, frenchSeparateSchoolCode)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.rollNumberCounty, record.rollNumberMunicipality, record.rollNumberMapArea, record.rollNumberMapDivision, record.rollNumberMapSubdivision, record.rollNumberParcel, record.rollNumberParcelSub, record.rollNumberPrimarySubordinate, record.rollNumberMunicipalityName, record.ward, record.poll, record.pollSuffix, record.highSchoolCode, record.publicSchoolCode, record.separateSchoolCode, record.specialRateArea, record.pacCode, record.previousRollNumber, record.frenchPublicSchoolCode, record.frenchSeparateSchoolCode);
            },
            BB: (record) => {
                database
                    .prepare(`insert into BB (
              rollNumber,
              frontageFeet, frontageMetres,
              siteAreaSquareFeet, siteAreaAcres,
              depthFeet, depthMetres, farmForestryExemptionAcres,
              siteImprovement,
              siteImprovementHasBoathouse, siteImprovementHasSiteImprovements,
              siteImprovementHasOther, siteImprovementHasAccessibleFacilities,
              siteImprovementHasPool, siteImprovementHasElevator,
              siteImprovementHasSauna, siteImprovementHasMultiple,
              siteImprovementHasTennisCourts,
              propertyCode, propertyCodeClass, propertyCodeName,
              services, servicesName,
              access, accessName)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.frontageFeet, record.frontageMetres, record.siteAreaSquareFeet, record.siteAreaAcres, record.depthFeet, record.depthMetres, record.farmForestryExemptionAcres, record.siteImprovement, record.siteImprovementHasBoathouse ? 1 : 0, record.siteImprovementHasSiteImprovements ? 1 : 0, record.siteImprovementHasOther ? 1 : 0, record.siteImprovementHasAccessibleFacilities ? 1 : 0, record.siteImprovementHasPool ? 1 : 0, record.siteImprovementHasElevator ? 1 : 0, record.siteImprovementHasSauna ? 1 : 0, record.siteImprovementHasMultiple ? 1 : 0, record.siteImprovementHasTennisCourts ? 1 : 0, record.propertyCode, record.propertyCodeClass, record.propertyCodeName, record.services, record.servicesName, record.access, record.accessName);
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
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.characterOfConstruction, record.characterOfConstructionDescription, record.characterOfConstructionFramingDescription, record.characterOfConstructionFloorDescription, record.characterOfConstructionRoofDescription, record.characterOfConstructionWallsDescription, record.quality, record.shape, record.yearBuilt, record.yearBuiltCode, record.yearBuiltCodeName, record.condition, record.conditionName, record.conditionRankingOutOf5, record.fullStoreys, record.partStoreys, record.partStoreysName, record.heightEffectiveYearBuilt, record.heightFeet, record.effectiveYearBuilt, record.split, record.splitName, record.grossArea, record.grossAreaSquareFeet, record.totalBasementArea, record.totalBasementAreaSquareFeet, record.finishedBasementArea, record.finishedBasementAreaSquareFeet, record.basementFinish, record.basementFinishName, record.fullBaths, record.halfBaths, record.numberOfBedrooms, record.numberOfFireplaces, record.heatingType, record.heatingTypeName, record.airConditioning, record.garageType, record.garageTypeName, record.garageSpaces, record.structureCode, record.structureCodeClass, record.structureCodeName);
            },
            DD: (record) => {
                database
                    .prepare(`insert into DD (
              rollNumber, sequenceNumber,
              acres,
              texture, textureName,
              soilClass, soilClassPointsRemainingMin, soilClassPointsRemainingMax,
              climaticZone,
              woodedAcreage, orchardAcreage)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.acres, record.texture, record.textureName, record.soilClass, record.soilClassPointsRemainingMin, record.soilClassPointsRemainingMax, record.climaticZone, record.woodedAcreage, record.orchardAcreage);
            },
            GG: (record) => {
                database
                    .prepare(`insert into GG (
              rollNumber, sequenceNumber,
              name,
              identifier, identifierName,
              occupancyStatus, occupancyStatusName,
              religion,
              schoolSupport, schoolSupportName,
              residencyCode, residencyCodeDescription,
              citizenship,
              designatedRatepayerCode,
              yearOfBirth, monthOfBirth,
              frenchLanguageEducationRights)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.name, record.identifier, record.identifierName, record.occupancyStatus, record.occupancyStatusName, record.religion, record.schoolSupport, record.schoolSupportName, record.residencyCode, record.residencyCodeDescription, record.citizenship, record.designatedRatepayerCode, record.yearOfBirth, record.monthOfBirth, record.frenchLanguageEducationRights);
            },
            HH: (record) => {
                database
                    .prepare(`insert into HH (
              rollNumber, sequenceNumber, mailingAddress)
              values (?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.mailingAddress);
            },
            JJ: (record) => {
                database
                    .prepare(`insert into JJ (
              rollNumber, cityProvinceCountry, postalCode)
              values (?, ?, ?)`)
                    .run(record.rollNumber, record.cityProvinceCountry, record.postalCode);
            },
            KK: (record) => {
                database
                    .prepare(`insert into KK (
              rollNumber,
              streetNumber, upperStreetNumber,
              qualifier,
              streetName,
              unitNumber,
              civicAddress)
              values (?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.streetNumber, record.upperStreetNumber, record.qualifier, record.streetName, record.unitNumber, record.civicAddress);
            },
            LL: (record) => {
                database
                    .prepare(`insert into LL (
              rollNumber, sequenceNumber, legalDescription)
              values (?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.legalDescription);
            },
            MM: (record) => {
                database
                    .prepare(`insert into MM (
              rollNumber, sequenceNumber, commentsSiteDimensions)
              values (?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.commentsSiteDimensions);
            },
            PA: (record) => {
                database
                    .prepare(`insert into PA (
              rollNumber, sequenceNumber,
              phasedInValueDollars,
              unitClass, unitClassDescription,
              realtyTaxClass, realtyTaxClassName,
              realtyTaxQualifier, realtyTaxQualifierClass, realtyTaxQualifierName,
              tenantTaxLiability,
              noticeIssued,
              previousYearAssessmentDollars,
              unitSupport, unitSupportName,
              pooledTaxesUnit,
              propertyType, propertyTypeName,
              propertyTotalDollars, realtyPortionTotalDollars)
              values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.phasedInValueDollars, record.unitClass, record.unitClassDescription, record.realtyTaxClass, record.realtyTaxClassName, record.realtyTaxQualifier, record.realtyTaxQualifierClass, record.realtyTaxQualifierName, record.tenantTaxLiability, record.noticeIssued, record.previousYearAssessmentDollars, record.unitSupport, record.unitSupportName, record.pooledTaxesUnit, record.propertyType, record.propertyTypeName, record.propertyTotalDollars, record.realtyPortionTotalDollars);
            },
            PB: (record) => {
                database
                    .prepare(`insert into PB (
              rollNumber, sequenceNumber,
              realtyPortionEnglishPublicDollars, realtyPortionEnglishSeparateDollars, realtyPortionNoSupportDollars)
              values (?, ?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.realtyPortionEnglishPublicDollars, record.realtyPortionEnglishSeparateDollars, record.realtyPortionNoSupportDollars);
            },
            PC: (record) => {
                database
                    .prepare(`insert into PC (
              rollNumber, sequenceNumber,
              realtyPortionFrenchPublicDollars, realtyPortionFrenchSeparateDollars)
              values (?, ?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.realtyPortionFrenchPublicDollars, record.realtyPortionFrenchSeparateDollars);
            },
            PD: (record) => {
                database
                    .prepare(`insert into PD (
              rollNumber, sequenceNumber, realtyPortionProtestantSeparateDollars)
              values (?, ?, ?)`)
                    .run(record.rollNumber, record.sequenceNumber, record.realtyPortionProtestantSeparateDollars);
            },
            PI: (record) => {
                database
                    .prepare(`insert into PI (
              rollNumber,
              phaseInStartingPointDollars, phaseInValueDollars, phaseInDestinationValueDollars)
              values (?, ?, ?, ?)`)
                    .run(record.rollNumber, record.phaseInStartingPointDollars, record.phaseInValueDollars, record.phaseInDestinationValueDollars);
            }
        }
    });
    database.close();
}
catch (error) {
    console.error(error);
}
